import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';


export interface ModuleAPI {
	mainRouteComponent?: FunctionComponent;
	[key: string]: any;
}
export interface RouteConfigComponentProps<Params extends { [K in keyof Params]?: string } = {}> extends RouteComponentProps<Params> {
    route?: ModuleRouteConfig;
}

export interface ModuleRouteConfig {
	label?: string;
	key?: React.Key;
	path: string;
	component: React.ComponentType<RouteConfigComponentProps<any>> | React.ComponentType;
	routes?: ModuleRouteConfig[];
	[propName: string]: any;
}

export interface Modules {
	exposeModuleApi: (moduleName: string, api: {[key: string]: any}) => void;
	getModuleAPI: (moduleName: string) => ModuleAPI;
}

export interface Routes {
	register: (routeConfig: ModuleRouteConfig) => void;
	getAll: () => ModuleRouteConfig[];
	render: (routeConfig: ModuleRouteConfig[]) => void;
}
