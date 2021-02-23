import React from 'react';
import PreNavigation from './preNavigation.class';

describe('PreNavigation', () => {
	let preNavigation: PreNavigation;

	beforeEach(() => {
		preNavigation = new PreNavigation();
	});

	it('should be able to register a pre navigation component', (done) => {
		preNavigation.register({
			component() {
				return <div>div</div>;
			},
			includePaths: ['path1'],
			excludePaths: ['path2'],
		});

		expect(preNavigation.preNavigationItems.length).toBe(1);
		expect(preNavigation.preNavigationItems[0].component).toBeDefined();
		preNavigation.preNavigationItemsChanges.subscribe((items) => {
			expect(items.length).toBe(1);
			done();
		});
	});
});
