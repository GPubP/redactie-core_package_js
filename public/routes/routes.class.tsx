import React from 'react';
import { Switch, Route, SwitchProps, RouteComponentProps } from 'react-router-dom';
import { ModuleRouteConfig } from './routes.types';

export default class Routes {
	private registeredRoutes: ModuleRouteConfig[] = [];

	register(routeConfig: ModuleRouteConfig): void {
		this.registeredRoutes.push(routeConfig);
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
