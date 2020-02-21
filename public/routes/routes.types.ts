import { RouteComponentProps, SwitchProps } from 'react-router-dom';

export interface RouteConfigComponentProps<Params extends { [K in keyof Params]?: string } = {}> extends RouteComponentProps<Params> {
	route?: ModuleRouteConfig;
}

export interface ChildRouteConfigComponentProps<Params extends { [K in keyof Params]?: string } = {}> extends RouteComponentProps<Params> {
	route?: ChildModuleRouteConfig;
}

export interface BaseRouteConfig {
	key?: string;
	label?: string;
	path: string;
	routes?: ChildModuleRouteConfig[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[propName: string]: any;
}

export interface ModuleRouteConfig extends BaseRouteConfig {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: React.ComponentType<RouteConfigComponentProps<any>> | React.ComponentType | React.ComponentType<{ route: ModuleRouteConfig }>;
	isDefaultRoute?: boolean;
}

export interface ChildModuleRouteConfig extends BaseRouteConfig {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: React.ComponentType<RouteConfigComponentProps<any>> | React.ComponentType | React.ComponentType<{ route: ChildModuleRouteConfig }>;
}

export interface Routes {
	register: (routeConfig: ModuleRouteConfig) => void;
	getAll: () => ModuleRouteConfig[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	render: (routeConfig: ModuleRouteConfig[], extraProps?: any, switchProps?: SwitchProps) => object;
}
