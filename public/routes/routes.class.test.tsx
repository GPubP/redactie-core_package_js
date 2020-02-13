import React from 'react';
import Routes from './routes.class';
import { ModuleRouteConfig } from './routes.types';

describe('Routes', () => {
	let routes: Routes;
	const dummyRouteConfig: ModuleRouteConfig = {
		path: '/external',
		component: () => <div>test</div>,
	}

	beforeEach(() => {
		routes = new Routes()
	})

	it('Should be able to register a route', () => {
		expect(routes).toBeInstanceOf(Routes);
		routes.register(dummyRouteConfig);
		expect(routes.getAll()).toEqual([dummyRouteConfig]);
	})

	it('Should be able to render all routes', () => {
		expect(routes).toBeInstanceOf(Routes);
		routes.register(dummyRouteConfig);
		const allRoutes = routes.getAll();
		expect(routes.render(allRoutes)).toBeInstanceOf(Object)
	})
})
