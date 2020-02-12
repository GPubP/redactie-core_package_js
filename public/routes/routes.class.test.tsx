import React from 'react';
import WCMRoutes from './routes.class';
import { ModuleRouteConfig } from './routes.types';

describe('WCMRoutes', () => {
	let wcmRoutes: WCMRoutes;
	const dummyRouteConfig: ModuleRouteConfig = {
		path: '/external',
		component: () => <div>test</div>,
	}

	beforeEach(() => {
		wcmRoutes = new WCMRoutes()
	})

	it('Should be able to register a route', () => {
		expect(wcmRoutes).toBeInstanceOf(WCMRoutes);
		wcmRoutes.register(dummyRouteConfig);
		expect(wcmRoutes.getAll()).toEqual([dummyRouteConfig]);
	})

	it('Should be able to render all routes', () => {
		expect(wcmRoutes).toBeInstanceOf(WCMRoutes);
		wcmRoutes.register(dummyRouteConfig);
		const allRoutes = wcmRoutes.getAll();
		expect(wcmRoutes.render(allRoutes)).toBeInstanceOf(Object)
	})
})
