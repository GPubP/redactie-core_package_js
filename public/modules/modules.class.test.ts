import WCMModules from './modules.class';

describe('WCMModules', () => {
	let wcmModules: WCMModules;

	beforeEach(() => {
		wcmModules = new WCMModules()
	})

	it('Should be able to expose a module api', () => {
		expect(wcmModules).toBeInstanceOf(WCMModules);
		wcmModules.exposeModuleApi('external-module', {'external-module-api': 'test'})
		expect(wcmModules.getModuleAPI('external-module')).toEqual({'external-module-api': 'test'})
	})
})
