import { ModuleAPI } from './modules.types';

export default class WCMModules {
	private registeredModules: { [key: string]: any } = {};

	exposeModuleApi(moduleName: string, api: { [key: string]: any }): void {
		if (this.registeredModules[moduleName]) {
			return;
		}

		this.registeredModules[moduleName] = api;
	}
	getModuleAPI(moduleName: string): ModuleAPI {
		return this.registeredModules[moduleName];
	}
}
