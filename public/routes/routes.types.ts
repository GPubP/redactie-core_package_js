import { ComponentType } from 'react';
import { RouteComponentProps, SwitchProps } from 'react-router-dom';
import { Observable } from 'rxjs';

interface RouteExtraProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[propName: string]: any;
}

export interface RouteConfigComponentProps<Params extends { [K in keyof Params]?: string } = {}> extends RouteComponentProps<Params> {
	route: ModuleRouteConfig;
}

export interface ChildRouteConfigComponentProps<Params extends { [K in keyof Params]?: string } = {}> extends RouteComponentProps<Params> {
	route: ChildModuleRouteConfig;
}

export interface BaseRouteConfig extends RouteExtraProps {
	key?: string;
	label?: string;
	path: string;
	routes?: ChildModuleRouteConfig[];
}

export interface ModuleRouteConfig extends BaseRouteConfig {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: ComponentType<any>;
	isDefaultRoute?: boolean;
}

export interface ChildModuleRouteConfig extends BaseRouteConfig {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: ComponentType<any>;
}

export interface Routes {
	register: (routeConfig: ModuleRouteConfig) => void;
	getAll: () => ModuleRouteConfig[];
	routesChanges: Observable<ModuleRouteConfig[] | null>;
	render: (routeConfig: ModuleRouteConfig[], extraProps?: RouteExtraProps, switchProps?: SwitchProps) => object;
	setPathPrefix: (prefix: string) => void;
}

export interface RouteOptions {
	prefix: boolean;
}
