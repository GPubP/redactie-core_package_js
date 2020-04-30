import { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface RouteExtraProps {
	[propName: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export type BreadcrumbFunction = (props: BreadcrumbProps) => string;

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

export interface RouteOptions {
	prefix: boolean;
}
