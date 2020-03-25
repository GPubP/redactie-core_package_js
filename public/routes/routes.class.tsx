import React, { ReactElement } from 'react';
import { Observable, ReplaySubject } from 'rxjs';
import { Route, RouteComponentProps, Switch, SwitchProps, Redirect } from 'react-router-dom';
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
		switchProps: SwitchProps = {}
	): ReactElement | null {
		const redirectRoute = routes?.find((route) => route.isDefaultRoute);

		return routes ? (
			<>
				<Switch {...switchProps}>
					{redirectRoute && (
						<Redirect exact from={this.pathPrefix} to={redirectRoute.path} />
					)}
					{routes.map((route, index) => {
						return (
							<Route
								key={route.key || index}
								path={route.path}
								render={(props: RouteComponentProps): JSX.Element =>
									route.render ? (
										route.render({ ...props, ...extraProps, route: route })
									) : (
										<route.component {...props} {...extraProps} route={route} />
									)
								}
							/>
						);
					})}
				</Switch>
			</>
		) : null;
	}

	private prefixRoute(routeConfig: ModuleRouteConfig): ModuleRouteConfig {
		// Set path prefix recursively on all routes
		return {
			...routeConfig,
			path: `${this.pathPrefix}${routeConfig.path}`,
			routes:
				routeConfig.routes && routeConfig.routes.map((route) => this.prefixRoute(route)),
		};
	}

	private getRoutePath(path: string, prefix: boolean): string {
		return prefix ? `${this.pathPrefix}${path}` : path;
	}
}
