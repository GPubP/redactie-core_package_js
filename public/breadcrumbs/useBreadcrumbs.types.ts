import { ComponentType, ElementType } from 'react';
import { Match, ModuleRouteConfig, Location } from '../routes/routes.types';

export interface Breadcrumb {
	match?: Match;
	location?: Location;
	name: ComponentType | ElementType | string;
	target: string;
}

export type BreadcrumbComponentProps = Breadcrumb;

export interface BreadcrumbOptions {
	excludePaths?: string[];
	extraBreadcrumbs?: Breadcrumb[];
}

export interface GetBreadcrumbsProps {
	routes: ModuleRouteConfig[];
	location: Location;
	options?: BreadcrumbOptions;
}

export interface GetBreadcrumbMatchProps {
	currentSection: string;
	location: Location;
	pathSection: string;
	routes: ModuleRouteConfig[];
	excludePaths?: string[];
}

export interface CustomLinkProps {
	href: string;
	breadcrumb: Breadcrumb;
}
