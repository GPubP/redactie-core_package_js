import { ComponentType, ElementType } from 'react';
import { RouteComponentProps, SwitchProps } from 'react-router-dom';
import { GuardFunction, PageComponent } from 'react-router-guards';
import { Observable } from 'rxjs';

export { GuardFunction, PageComponent } from 'react-router-guards';

export interface RouteConfigComponentProps<Params extends { [K in keyof Params]?: string } = {}>
	extends RouteComponentProps<Params> {
	route: ModuleRouteConfig;
}

export interface ChildRouteConfigComponentProps<
	Params extends { [K in keyof Params]?: string } = {}
> extends RouteComponentProps<Params> {
	route: ChildModuleRouteConfig;
}

export interface Location {
	pathname: string;
}
export interface Match {
	url: string;
	path?: string;
	params?: {
		[key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
	};
	isExact?: boolean;
}

export interface BaseRouteConfig {
	key?: string;
	label?: string;
	path: string;
	routes?: ChildModuleRouteConfig[];
	breadcrumb?: ComponentType | ElementType | string | null;
	guardOptions?: {
		guards?: GuardFunction[];
		ignoreGlobal?: boolean;
		loading?: PageComponent;
		error?: PageComponent;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		meta?: Record<string, any>;
	};
	navigation?: {
		context?: string;
		renderContext?: string;
		label: string;
		order?: number;
		parentPath?: string;
	};
	matchOptions?: {
		exact?: boolean;
		strict?: boolean;
	};
	[propName: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface ModuleRouteConfig extends BaseRouteConfig {
	component: ComponentType<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
	isDefaultRoute?: boolean;
}

export interface ChildModuleRouteConfig extends BaseRouteConfig {
	component: ComponentType<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface Routes {
	register: (routeConfig: ModuleRouteConfig) => void;
	getAll: () => ModuleRouteConfig[];
	routesChanges: Observable<ModuleRouteConfig[] | null>;
	render: (
		routeConfig: ModuleRouteConfig[],
		extraProps?: Record<string, unknown>,
		switchProps?: SwitchProps
	) => object;
	setPathPrefix: (prefix: string) => void;
}

export interface RouteOptions {
	prefix: boolean;
}
