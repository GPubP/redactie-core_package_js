import { RouteComponentProps } from 'react-router-dom';

export interface RouteConfigComponentProps<Params extends { [K in keyof Params]?: string } = {}> extends RouteComponentProps<Params> {
	route?: ModuleRouteConfig;
}

export interface ModuleRouteConfig {
	label?: string;
	key?: React.Key;
	path: string;
	component: React.ComponentType<RouteConfigComponentProps<any>> | React.ComponentType;
	routes?: ModuleRouteConfig[];
	[propName: string]: any;
}

export interface Routes {
	register: (routeConfig: ModuleRouteConfig) => void;
	getAll: () => ModuleRouteConfig[];
	render: (routeConfig: ModuleRouteConfig[]) => object;
}
