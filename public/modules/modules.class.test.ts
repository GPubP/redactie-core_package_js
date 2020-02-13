import Modules from './modules.class';

describe('Modules', () => {
	let modules: Modules;

	beforeEach(() => {
		modules = new Modules()
	})

	it('Should be able to expose a module api', () => {
		expect(modules).toBeInstanceOf(Modules);
		modules.exposeModuleApi('external-module', {'external-module-api': 'test'})
		expect(modules.getModuleAPI('external-module')).toEqual({'external-module-api': 'test'})
	})
})
