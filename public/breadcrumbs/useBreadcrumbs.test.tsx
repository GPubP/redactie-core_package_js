import { render, getNodeText } from '@testing-library/react';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';

import { ModuleRouteConfig } from '../routes/routes.types';

import useBreadcrumbs from './useBreadcrumbs';
import { BreadcrumbOptions, BreadcrumbComponentProps } from './useBreadcrumbs.types';

const BreadcrumbComponent = ({
	routes,
	options,
}: {
	routes: ModuleRouteConfig[];
	options: BreadcrumbOptions;
}): React.ReactElement => {
	const breadcrumbs = useBreadcrumbs(routes, options);

	return <>{breadcrumbs}</>;
};
const DummyRouteComponent = (): React.ReactElement => <div></div>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const renderRouter = (
	pathname: string,
	routes: ModuleRouteConfig[],
	options?: BreadcrumbOptions
): {
	breadcrumbItems: NodeListOf<HTMLElement> | null;
	breadcrumbsWrapper: Element | null;
	container: HTMLElement;
} => {
	const defaultOptions = {
		...options,
	};
	const { container } = render(
		<Router initialIndex={0} initialEntries={[{ pathname }]}>
			<BreadcrumbComponent options={defaultOptions} routes={routes} />
		</Router>
	);

	const breadcrumbsWrapper = container.querySelector('.m-breadcrumbs');
	const breadcrumbItems = container.querySelectorAll('li');

	return {
		breadcrumbItems,
		breadcrumbsWrapper,
		container,
	};
};

describe('useBreadcrumbs', () => {
	it('Should return a breadcrumb tree as expected', () => {
		const routes = [
			// test home route
			{
				path: '/',
				breadcrumb: 'Home',
				component: DummyRouteComponent,
			},
			// test default breadcrumb
			{
				path: '/1',
				component: DummyRouteComponent,
			},
			// test breadcrumb passed as string
			{
				path: '/1/2',
				breadcrumb: 'Two',
				component: DummyRouteComponent,
			},
			// test simple breadcrumb component
			{
				path: '/1/2/3',
				breadcrumb(): React.ReactElement {
					return <p>test</p>;
				},
				component: DummyRouteComponent,
			},
			// test advanced breadcrumb component (user can use `match` however they wish)
			{
				path: '/1/2/3/:number',
				breadcrumb({ match }: BreadcrumbComponentProps): React.ReactElement {
					return <p>{match?.params?.number}</p>;
				},
				component: DummyRouteComponent,
			},

			// test a no-match route
			{
				path: '/no-match',
				breadcrumb: 'no match',
				component: DummyRouteComponent,
			},
		];

		const { breadcrumbItems } = renderRouter('/1/2/3/4', routes);

		expect(breadcrumbItems).not.toBeNull();
		expect(breadcrumbItems).toHaveLength(6);

		if (breadcrumbItems) {
			// Test breadcrumb name
			expect(getNodeText(breadcrumbItems[0].querySelector('a') as HTMLElement)).toBe('Home');
			expect(getNodeText(breadcrumbItems[1].querySelector('a') as HTMLElement)).toBe('1');
			expect(getNodeText(breadcrumbItems[2].querySelector('a') as HTMLElement)).toBe('Two');
			expect(getNodeText(breadcrumbItems[3].querySelector('p') as HTMLElement)).toBe('test');
			expect(getNodeText(breadcrumbItems[4].querySelector('p') as HTMLElement)).toBe('4');

			// The last breadcrumb is always empty
			expect(getNodeText(breadcrumbItems[5] as HTMLElement)).toBe('');

			// Test href
			expect(
				(breadcrumbItems[0].querySelector('a') as HTMLElement).getAttribute('href')
			).toBe('/');
			expect(
				(breadcrumbItems[1].querySelector('a') as HTMLElement).getAttribute('href')
			).toBe('/1');
			expect(
				(breadcrumbItems[2].querySelector('a') as HTMLElement).getAttribute('href')
			).toBe('/1/2');
		}
	});

	describe('Defaults', () => {
		it('Should render the user-provided breadcrumb name where possible and use defaults otherwise', () => {
			const routes = [
				{
					path: '/',
					breadcrumb: 'Home',
					component: DummyRouteComponent,
				},
				{
					path: '/one',
					breadcrumb: 'Override',
					component: DummyRouteComponent,
				},
				{
					path: '/one/two',
					component: DummyRouteComponent,
				},
				{
					path: '/one/two/three',
					component: DummyRouteComponent,
				},
			];
			const { breadcrumbItems } = renderRouter('/one/two/three', routes);
			if (breadcrumbItems) {
				// Test breadcrumb name
				expect(getNodeText(breadcrumbItems[0].querySelector('a') as HTMLElement)).toBe(
					'Home'
				);
				expect(getNodeText(breadcrumbItems[1].querySelector('a') as HTMLElement)).toBe(
					'Override'
				);
				expect(getNodeText(breadcrumbItems[2].querySelector('a') as HTMLElement)).toBe(
					'Two'
				);
				expect(getNodeText(breadcrumbItems[3].querySelector('a') as HTMLElement)).toBe(
					'Three'
				);
				expect(getNodeText(breadcrumbItems[4] as HTMLElement)).toBe('');
			}
		});

		describe('No breadcrumbs', () => {
			it('Should be possible to NOT render a breadcrumb', () => {
				const routes = [
					{
						path: '/',
						breadcrumb: 'Home',
						component: DummyRouteComponent,
					},
					{
						path: '/one',
						breadcrumb: null,
						component: DummyRouteComponent,
						routes: [
							{
								path: '/one/two',
								component: DummyRouteComponent,
							},
						],
					},
				];
				const { breadcrumbItems } = renderRouter('/one/two', routes);
				if (breadcrumbItems) {
					expect(getNodeText(breadcrumbItems[0].querySelector('a') as HTMLElement)).toBe(
						'Home'
					);
					expect(getNodeText(breadcrumbItems[1].querySelector('a') as HTMLElement)).toBe(
						'Two'
					);
				}
			});

			it('Should be possible to NOT render a "Home" breadcrumb', () => {
				const routes = [
					{
						path: '/',
						breadcrumb: null,
						component: DummyRouteComponent,
					},
					{
						path: '/one',
						component: DummyRouteComponent,
					},
				];
				const { breadcrumbItems } = renderRouter('/one', routes);
				expect(breadcrumbItems).toHaveLength(2);
				if (breadcrumbItems) {
					expect(getNodeText(breadcrumbItems[0].querySelector('a') as HTMLElement)).toBe(
						'One'
					);
				}
			});
		});
	});

	describe('Options', () => {
		describe('excludePaths', () => {
			it('Should not return breadcrumbs for specified paths', () => {
				const routes = [
					{
						path: '/',
						breadcrumb: 'Home',
						component: DummyRouteComponent,
					},
					{
						path: '/one',
						component: DummyRouteComponent,
					},
					{
						path: '/one/two',
						component: DummyRouteComponent,
					},
				];
				const { breadcrumbItems } = renderRouter('/one/two', routes, {
					excludePaths: ['/one'],
				});
				if (breadcrumbItems) {
					expect(breadcrumbItems).toHaveLength(3);
					expect(getNodeText(breadcrumbItems[0].querySelector('a') as HTMLElement)).toBe(
						'Home'
					);
					expect(getNodeText(breadcrumbItems[1].querySelector('a') as HTMLElement)).toBe(
						'Two'
					);
				}
			});
		});

		describe('extraBreadcrumbs', () => {
			it('should render some extra breadcrumbs before the generated breadcrumbs', () => {
				const routes = [
					{
						path: '/',
						breadcrumb: null,
						component: DummyRouteComponent,
					},
					{
						path: '/one',
						component: DummyRouteComponent,
					},
				];
				const extraBreadcrumb = {
					name: 'Custom Home',
					target: '/some/custom/path',
				};
				const { breadcrumbItems } = renderRouter('/one', routes, {
					extraBreadcrumbs: [extraBreadcrumb],
				});
				if (breadcrumbItems) {
					expect(breadcrumbItems).toHaveLength(3);
					expect(getNodeText(breadcrumbItems[0].querySelector('a') as HTMLElement)).toBe(
						extraBreadcrumb.name
					);
					expect(
						(breadcrumbItems[0].querySelector('a') as HTMLElement).getAttribute('href')
					).toBe(extraBreadcrumb.target);
					expect(getNodeText(breadcrumbItems[1].querySelector('a') as HTMLElement)).toBe(
						'One'
					);
				}
			});
		});
	});

	describe('When pathname includes a trailing slash', () => {
		it('Should ignore the trailing slash', () => {
			const routes = [
				{
					path: '/one',
					component: DummyRouteComponent,
				},
			];
			const { breadcrumbItems } = renderRouter('/one/', routes);
			if (breadcrumbItems) {
				expect(breadcrumbItems).toHaveLength(3);
				expect(getNodeText(breadcrumbItems[0].querySelector('a') as HTMLElement)).toBe(
					'Home'
				);
			}
		});
	});

	describe('When pathname includes query params', () => {
		it('Should not render the query inside the breadcrumb name', () => {
			const routes = [
				{
					path: '/one',
					component: DummyRouteComponent,
				},
			];
			const { breadcrumbItems } = renderRouter('/one?mock=query', routes);
			if (breadcrumbItems) {
				expect(breadcrumbItems).toHaveLength(3);
				expect(getNodeText(breadcrumbItems[0].querySelector('a') as HTMLElement)).toBe(
					'Home'
				);
			}
		});
	});
});
