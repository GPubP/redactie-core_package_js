import { ModuleAPI } from './modules.types';

export default class Modules {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private registeredModules: { [key: string]: any } = {};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	exposeModuleApi(moduleName: string, api: { [key: string]: any }): void {
		if (this.registeredModules[moduleName]) {
			throw 'Module already exists';
		}

		this.registeredModules[moduleName] = api;
	}
	getModuleAPI(moduleName: string): ModuleAPI {
		return this.registeredModules[moduleName];
	}
}
