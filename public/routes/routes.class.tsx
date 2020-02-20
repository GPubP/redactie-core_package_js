import React from 'react';
import { Switch, Route, SwitchProps, RouteComponentProps } from 'react-router-dom';
import { ModuleRouteConfig, ChildModuleRouteConfig } from './routes.types';

/**
 * set isDefaultRoute to false because subroutes can never be the default route.
 */
const cleanupSubRoutes = (route: ChildModuleRouteConfig): ChildModuleRouteConfig => {
	route.isDefaultRoute = false;
	route.routes && route.routes.map(cleanupSubRoutes);
	return route;
};

export default class Routes {
	private registeredRoutes: ModuleRouteConfig[] = [];

	register(routeConfig: ModuleRouteConfig): void {
		const newRoute = routeConfig;

		this.registeredRoutes.forEach((route: ModuleRouteConfig) => {
			if(routeConfig.isDefaultRoute && route.isDefaultRoute) {
				console.warn('Default route already exists.');
				newRoute.isDefaultRoute = false;
			}

			route.routes && route.routes.map(cleanupSubRoutes);
		});

		this.registeredRoutes.push(newRoute);
	}
	getAll(): ModuleRouteConfig[] {
		return this.registeredRoutes;
	}
	render(routes: ModuleRouteConfig[] | undefined, extraProps: any = {}, switchProps: SwitchProps = {}): any {
		return routes ? (
			<Switch {...switchProps}>
				{routes.map((route, index) => (
					<Route
						key={route.key || index}
						path={route.path}
						render={
							(props: RouteComponentProps): JSX.Element => route.render ? (
								route.render({ ...props, ...extraProps, route: route })
							) : (
								<route.component {...props} {...extraProps} route={route} />
							)
						}

					/>
				))}
			</Switch>
		) : null;
	}
}
