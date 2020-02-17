import { RouteComponentProps } from 'react-router-dom';

export interface RouteConfigComponentProps<Params extends { [K in keyof Params]?: string } = {}> extends RouteComponentProps<Params> {
	route?: ModuleRouteConfig;
}

export interface ModuleRouteConfig {
	label?: string;
	key?: React.Key;
	path: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: React.ComponentType<RouteConfigComponentProps<any>> | React.ComponentType | React.ComponentType<{ route: ModuleRouteConfig }>;
	routes?: ModuleRouteConfig[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[propName: string]: any;
}

export interface Routes {
	register: (routeConfig: ModuleRouteConfig) => void;
	getAll: () => ModuleRouteConfig[];
	render: (routeConfig: ModuleRouteConfig[]) => object;
}
