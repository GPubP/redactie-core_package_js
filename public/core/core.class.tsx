import * as React from 'react';
import { Switch, Route, SwitchProps } from 'react-router-dom';
import { ModuleAPI, ModuleRouteConfig, Modules, Routes } from './core.types';

class WCMModules implements Modules {
	private registeredModules: { [key: string]: any } = {};

	exposeModuleApi(moduleName: string, api: { [key: string]: any; }): void {
		if (this.registeredModules[moduleName]) {
			return;
		}

		this.registeredModules[moduleName] = api;
	};
	getModuleAPI(moduleName: string): ModuleAPI {
		return this.registeredModules[moduleName];
	};
}

class WCMRoutes implements Routes {
	private registeredRoutes: ModuleRouteConfig[] = [];

	register(routeConfig: ModuleRouteConfig): void {
		debugger;
		this.registeredRoutes.push(routeConfig);
	};
	getAll(): ModuleRouteConfig[] {
		return this.registeredRoutes;
	};
	render(routes: ModuleRouteConfig[]) {
		return this.renderRoutes(routes)
	};

	private renderRoutes(routes: ModuleRouteConfig[] | undefined, extraProps: any = {}, swicthProps: SwitchProps = {}): any {
		return routes ? (
			<Switch {...swicthProps}>
				{routes.map((route, index) => (
					<Route
						key={route.key || index}
						path={route.path}
						render={
							props => route.render ? (
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

export const wcmCore = {
	modules: new WCMModules(),
	routes: new WCMRoutes()
}
