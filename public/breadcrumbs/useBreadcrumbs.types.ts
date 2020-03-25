import { Match, ModuleRouteConfig, Location } from '../routes/routes.types';

export interface Breadcrumb {
	match: Match;
	location: Location;
	name: string;
	target: string;
}

export interface BreadcrumbOptions {
	excludePaths?: string[];
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
	name: string;
}
