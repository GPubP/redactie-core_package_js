import { RouteComponentProps, SwitchProps } from 'react-router-dom';
import { Observable } from 'rxjs';

export type BreadcrumbFunction = (props: BreadcrumbProps) => string;

export interface RouteConfigComponentProps<Params extends { [K in keyof Params]?: string } = {}> extends RouteComponentProps<Params> {
	route?: ModuleRouteConfig;
}

export interface ChildRouteConfigComponentProps<Params extends { [K in keyof Params]?: string } = {}> extends RouteComponentProps<Params> {
	route?: ChildModuleRouteConfig;
}

export interface Location {
	pathname: string;
}

export interface Match {
	url: string;
	path?: string;
	params?: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		[key: string]: any;
	};
	isExact?: boolean;
}

export interface BreadcrumbProps {
	match: Match;
	location: Location;
	key: string;
	currentSection: string;
}

export interface BaseRouteConfig {
	key?: string;
	label?: string;
	path: string;
	routes?: ChildModuleRouteConfig[];
	breadcrumb?: BreadcrumbFunction | string | null;
	matchOptions?: {
		exact?: boolean;
		strict?: boolean;
	};
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
	routesChanges: Observable<ModuleRouteConfig[] | null>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	render: (routeConfig: ModuleRouteConfig[], extraProps?: any, switchProps?: SwitchProps) => object;
	setPathPrefix: (prefix: string) => void;
}

export interface RouteOptions {
	prefix: boolean;
}
