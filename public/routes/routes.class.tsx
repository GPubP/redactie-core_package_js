import React from 'react';
import { Switch, Route, SwitchProps, RouteComponentProps } from 'react-router-dom';
import { ModuleRouteConfig } from './routes.types';

export default class Routes {
	private registeredRoutes: ModuleRouteConfig[] = [];

	register(routeConfig: ModuleRouteConfig): void {
		const newRoute = routeConfig;
		const defaultRouteExists = this.registeredRoutes.find((route: ModuleRouteConfig) => route.isDefaultRoute);

		if(defaultRouteExists) {
			console.warn('Default route already exists.');
			newRoute.isDefaultRoute = false;
		}

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
