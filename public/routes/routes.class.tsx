import React, { ReactElement } from 'react';
import { Route, RouteComponentProps, Switch, SwitchProps } from 'react-router-dom';
import { ModuleRouteConfig } from './routes.types';

export default class Routes {
	private pathPrefix = '';
	private registeredRoutes: ModuleRouteConfig[] = [];

	public setPathPrefix(pathPrefix = ''): void {
		this.pathPrefix = pathPrefix;
	}

	public register(routeConfig: ModuleRouteConfig): void {
		const newRoute = routeConfig;
		const defaultRouteExists = this.registeredRoutes.find(
			(route: ModuleRouteConfig) => route.isDefaultRoute
		);

		if (defaultRouteExists) {
			console.warn('Default route already exists.');
			newRoute.isDefaultRoute = false;
		}

		this.registeredRoutes.push(this.prefixRoute(newRoute));
	}

	public getAll(): ModuleRouteConfig[] {
		return this.registeredRoutes;
	}

	public render(
		routes: ModuleRouteConfig[] | undefined,
		extraProps: { [key: string]: any } = {}, // eslint-disable-line @typescript-eslint/no-explicit-any
		switchProps: SwitchProps = {}
	): ReactElement | null {
		return routes ? (
			<Switch {...switchProps}>
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
		) : null;
	}

	private prefixRoute(routeConfig: ModuleRouteConfig): ModuleRouteConfig {
		// Set path prefix recursively on all routes
		return {
			...routeConfig,
			path: `${this.pathPrefix}${routeConfig.path}`,
			routes: routeConfig.routes && routeConfig.routes.map((route) => this.prefixRoute(route)),
		};
	}
}
