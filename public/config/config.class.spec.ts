import Config from './config.class';

describe('[UNIT - Config]', () => {
	it('should add value', () => {
		const config = new Config();

		config.add({
			core: {
				tenantId: 'test-id',
			},
		});

		expect(config.getValue()).toEqual({
			core: {
				tenantId: 'test-id',
			},
		});
	});

	it('should select value', async () => {
		const config = new Config();

		config.add({
			core: {
				tenantId: 'test-id',
			},
		});

		await new Promise((resolve) =>
			config.selectValue('core').subscribe((value) => {
				expect(value).toEqual({
					tenantId: 'test-id',
				}),
					resolve(null);
			})
		);
	});

	it('should get value', () => {
		const config = new Config();

		config.add({
			core: {
				tenantId: 'test-id',
			},
		});

		expect(config.getValue('core')).toEqual({
			tenantId: 'test-id',
		});
	});
});
