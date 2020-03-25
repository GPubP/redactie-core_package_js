import React, { useMemo } from 'react';
import { Breadcrumbs } from '@acpaas-ui/react-components';
import { useLocation, matchPath, Link } from 'react-router-dom';

import { ModuleRouteConfig } from '../routes/routes.types';

import {
	Breadcrumb,
	BreadcrumbOptions,
	GetBreadcrumbsProps,
	GetBreadcrumbMatchProps,
	CustomLinkProps,
} from './useBreadcrumbs.types';
import {
	DEFAULT_MATCH_OPTIONS,
	NO_BREADCRUMB,
	DEFAULT_NOT_FOUND_URL,
	DEFAULT_ROOT_BREADCRUMB_NAME,
} from './useBreadcrumbs.const';

/**
 * This method was "borrowed" from https://stackoverflow.com/a/28339742
 */
const humanize = (str: string): string => str
	.replace(/^[\s_]+|[\s_]+$/g, '')
	.replace(/[_\s]+/g, ' ')
	.replace(/^[a-z]/, (m) => m.toUpperCase());

/**
 * Takes a route array and recursively flatten it when there are
 * nested routes in the config
 */
const flattenRoutes = (routes?: ModuleRouteConfig[]): ModuleRouteConfig[] => {
	if (!Array.isArray(routes)) {
		return [];
	}

	return routes.reduce((acc, route) => ([
		...acc,
		route,
		...flattenRoutes(route.routes),
	]), [] as ModuleRouteConfig[]);
};

/**
 * Return a breadcrumb object when the path matches,
 * otherwise it will return a NO_BREADCRUMB string
 * to let you know that there is no breadcrumb available for the
 * given pathSection
 */
const getBreadcrumbMatch = ({
	currentSection,
	location,
	pathSection,
	routes,
	excludePaths,
}: GetBreadcrumbMatchProps): Breadcrumb | string => {
	let result;

	// Check the optional `excludePaths` option in `options` to see if the
	// current path should not include a breadcrumb
	if (Array.isArray(excludePaths)) {
		const isPathExcluded = excludePaths.find(path => matchPath(pathSection, {
			path,
			exact: true,
			strict: false,
		}));

		if (isPathExcluded) {
			return NO_BREADCRUMB;
		}
	}

	routes.some(({ breadcrumb, matchOptions, path }) => {
		if (!path) {
			throw new Error('useBreadcrumbs: `path` must be provided in every route object');
		}

		// Find a matching route
		// Returns an object when provided pathSection does match the path prop
		const match = matchPath(pathSection, {
			...(matchOptions || DEFAULT_MATCH_OPTIONS),
			path,
		});

		// Breadcrumbs with a value of null will not have a visible breadcrumb
		// This is an alternitive way the exclude the route from the breadcrumb array
		if ((match && breadcrumb === null) || (!match && matchOptions)) {
			result = NO_BREADCRUMB;
			return true;
		}

		if (match) {
			const parsedBreadcrumb = breadcrumb || humanize(currentSection);

			result = {
				match,
				location,
				target: match.url,
				name: typeof parsedBreadcrumb === 'function' ? parsedBreadcrumb({
					match,
					location,
					key: match.url,
					currentSection,
				}) : parsedBreadcrumb,
			};
			return true;
		}

		return false;
	});

	if (result) {
		return result;
	}

	// Generate default breadcrumb when the conditionals from above
	// don't fire
	return {
		match: {
			url: DEFAULT_NOT_FOUND_URL,
		},
		target: DEFAULT_NOT_FOUND_URL,
		location,
		name: humanize(pathSection === '/' ? DEFAULT_ROOT_BREADCRUMB_NAME : currentSection),
	};
};

/**
 * Generate a breadcrumb tree based on the given routes, location and options
 */
const getBreadcrumbs = ({
	routes,
	location,
	options = {},
}: GetBreadcrumbsProps): Breadcrumb[] => {
	const { pathname } = location;
	const matches: Breadcrumb[] = [];

	// Get pathname from url
	// https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname
	const url = new URL(`https://mock.be${pathname}`);

	url.pathname
		// Remove trailing slash "/" from pathname
		.replace(/\/$/, '')
		// Split pathname into segments
		.split('/')
		// Reduce over the segments
		.reduce((previousSection: string, currentSection: string) => {
			// Combine the last route section with the current section.
			// Example: 'pathname = /1/2/3' results in match checks for
			// `1`, `/1/2`, `/1/2/3`.

			const pathSection = !currentSection ? '/' : `${previousSection}/${currentSection}`;

			// get breadcrumb match
			const breadcrumbConfig = getBreadcrumbMatch({
				currentSection,
				location,
				pathSection,
				routes,
				...options,
			});

			if (breadcrumbConfig !== NO_BREADCRUMB && typeof breadcrumbConfig !== 'string') {
				matches.push(breadcrumbConfig);
			}

			return pathSection === '/' ? '' : pathSection;

		}, '');

	return matches;
};

/**
 * The useBreadcrumbs hook will return a breadcrumb component based on the given routes and options
 */
const useBreadcrumbs = (routes: ModuleRouteConfig[], options?: BreadcrumbOptions): React.ReactNode => {
	const location = useLocation();
	const breadcrumbs = useMemo(() => getBreadcrumbs({
		routes: flattenRoutes(routes),
		location,
		options,
	}), [routes]);

	const CustomLink = ({
		href,
		name,
	}: CustomLinkProps): React.ReactElement => {
		return <Link to={href}>{name}</Link>;
	};

	return (
		<Breadcrumbs
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			linkProps={(props: { href: string }): any => {
				return {
					...props,
					component: CustomLink,
					name: breadcrumbs.find((breadcrumb) => breadcrumb.target === props.href)?.name,
				};
			}}
			items={breadcrumbs}
		/>
	);

};

export default useBreadcrumbs;
