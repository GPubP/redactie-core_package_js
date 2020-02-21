import React, { FC } from 'react';
import Routes from './routes.class';
import { ModuleRouteConfig } from './routes.types';

const DummyComponent: FC = () => <div>test</div>;

describe('Routes', () => {
	let routes: Routes;
	const dummyRouteConfig: ModuleRouteConfig = {
		path: '/external',
		component: DummyComponent,
		routes: [
			{
				path: '/external/child',
				component: DummyComponent,
			},
		],
	};

	beforeEach(() => {
		routes = new Routes();
	});

	it('Should be able to register a route', () => {
		expect(routes).toBeInstanceOf(Routes);
		routes.register(dummyRouteConfig);
		expect(routes.getAll()).toEqual([dummyRouteConfig]);
	});

	it('Should be able to render all routes', () => {
		expect(routes).toBeInstanceOf(Routes);
		routes.register(dummyRouteConfig);
		const allRoutes = routes.getAll();
		expect(routes.render(allRoutes)).toBeInstanceOf(Object);
	});

	it('Should set pathPrefix recursively when available', () => {
		const routesWithPrefix = new Routes();
		routesWithPrefix.setPathPrefix('/prefix');
		routesWithPrefix.register(dummyRouteConfig);

		const allRoutes = routesWithPrefix.getAll();

		expect(allRoutes[0].path.includes('/prefix')).toBeTruthy();
		expect(allRoutes[0].routes && allRoutes[0].routes[0].path.includes('/prefix')).toBeTruthy();

	});
});
