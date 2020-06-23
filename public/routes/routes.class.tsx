import React, { ReactElement } from 'react';
import { Observable, ReplaySubject } from 'rxjs';
import { RouteComponentProps, Switch, SwitchProps, Redirect, generatePath } from 'react-router-dom';
import { GuardProvider, GuardedRoute, GuardProviderProps } from '@redactie/react-router-guards';
import { ModuleRouteConfig, ChildModuleRouteConfig, RouteOptions } from './routes.types';

export default class Routes {
	private pathPrefix = '';
	private registeredRoutes: ModuleRouteConfig[] = [];
	private registeredRoutesSubject: ReplaySubject<ModuleRouteConfig[]> = new ReplaySubject(1);

	public routesChanges: Observable<
		ModuleRouteConfig[] | null
	> = this.registeredRoutesSubject.asObservable();

	public setPathPrefix(pathPrefix = ''): void {
		this.pathPrefix = pathPrefix;
	}

	public register(
		routeConfig: ModuleRouteConfig,
		options: RouteOptions = { prefix: true }
	): void {
		const defaultRouteExists = this.registeredRoutes.find(
			(route: ModuleRouteConfig) => route.isDefaultRoute
		);

		if (defaultRouteExists && routeConfig.isDefaultRoute) {
			console.warn('Default route already exists.');
		}

		const newRouteConfig = {
			...(options.prefix ? this.prefixRoute(routeConfig) : routeConfig),
			isDefaultRoute: defaultRouteExists ? false : routeConfig.isDefaultRoute,
		};

		this.registeredRoutes = [...this.registeredRoutes, newRouteConfig];

		this.registeredRoutesSubject.next(this.registeredRoutes);
	}

	public updateChildRoutes(
		path: string,
		routes: ChildModuleRouteConfig[],
		options: RouteOptions = { prefix: true }
	): void {
		this.registeredRoutes = this.registeredRoutes.map((route) => {
			if (route.path === this.getRoutePath(path, options.prefix)) {
				return {
					...route,
					routes: options.prefix ? routes.map((r) => this.prefixRoute(r)) : routes,
				};
			}
			return route;
		});
		this.registeredRoutesSubject.next(this.registeredRoutes);
	}

	public update(routeConfig: ModuleRouteConfig, options: RouteOptions = { prefix: true }): void {
		this.registeredRoutes = this.registeredRoutes.map((route) => {
			if (route.path === this.getRoutePath(routeConfig.path, options.prefix)) {
				return options.prefix ? this.prefixRoute(routeConfig) : routeConfig;
			}
			return route;
		});
		this.registeredRoutesSubject.next(this.registeredRoutes);
	}

	public getAll(): ModuleRouteConfig[] {
		return this.registeredRoutes;
	}

	public render(
		routes: ModuleRouteConfig[] | undefined,
		extraProps: { [key: string]: any } = {}, // eslint-disable-line @typescript-eslint/no-explicit-any
		switchProps: SwitchProps = {},
		guardProviderProps: GuardProviderProps = {}
	): ReactElement | null {
		const redirectRoute = routes?.find((route) => route.isDefaultRoute);
		const isPathChanged = (
			routePrevProps: RouteComponentProps,
			routeProps: RouteComponentProps,
			path?: string | string[]
		): boolean => {
			if (routeProps?.location?.pathname !== routePrevProps?.location?.pathname) {
				// Check if the previous and next routes are child routes
				const prevRouteIsChild = routePrevProps?.match?.path === path;
				const nextRouteIsChild = routeProps?.match?.path === path;

				// Don't check the guard functions from a parent route when we navigate between
				// child routes
				// example:
				//		navigate to /sites => check site guards
				// 		navigate from /sites to /sites/123/detail => The site guard is not called because it only protects /sites
				return !(prevRouteIsChild && nextRouteIsChild);
			}

			return false;
		};

		return routes ? (
			<GuardProvider {...guardProviderProps}>
				<Switch {...switchProps}>
					{redirectRoute && (
						<Redirect exact from={this.pathPrefix} to={redirectRoute.path} />
					)}
					{routes.map((route, index) => {
						return (
							<GuardedRoute
								key={route.key || index}
								path={route.path}
								pathChanged={isPathChanged}
								strict={route.strict}
								{...route.guardOptions}
								render={(props: RouteComponentProps): JSX.Element =>
									route.redirect ? (
										<>
											<Redirect
												from={route.path}
												to={generatePath(route.redirect, {
													...props.match.params,
												})}
											/>
											<route.component
												{...props}
												{...extraProps}
												route={route}
											/>
										</>
									) : (
										<route.component {...props} {...extraProps} route={route} />
									)
								}
							/>
						);
					})}
				</Switch>
			</GuardProvider>
		) : null;
	}

	private prefixRoute(routeConfig: ModuleRouteConfig): ModuleRouteConfig {
		// Set path prefix recursively on all routes
		return {
			...routeConfig,
			path: `${this.pathPrefix}${routeConfig.path}`,
			redirect: routeConfig.redirect
				? `${this.pathPrefix}${routeConfig.redirect}`
				: undefined,
			routes:
				routeConfig.routes && routeConfig.routes.map((route) => this.prefixRoute(route)),
			navigation: routeConfig.navigation
				? {
						...routeConfig.navigation,
						parentPath: routeConfig.navigation.parentPath
							? `${this.pathPrefix}${routeConfig.navigation.parentPath}`
							: undefined,
				  }
				: undefined,
		};
	}

	private getRoutePath(path: string, prefix: boolean): string {
		return prefix ? `${this.pathPrefix}${path}` : path;
	}
}
