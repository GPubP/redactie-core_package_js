import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { ModuleAPI, ModuleAPIMap } from './modules.types';

export default class Modules {
	private registeredModules: ModuleAPIMap = {};
	private registeredModulesSubject = new BehaviorSubject<ModuleAPIMap>({});

	public registeredModules$ = this.registeredModulesSubject.asObservable();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public exposeModuleApi(moduleName: string, api: ModuleAPI): void {
		if (this.registeredModules[moduleName]) {
			throw 'Module already exists';
		}

		this.registeredModules[moduleName] = api;
		this.registeredModulesSubject.next(this.registeredModules);
	}

	public getModuleAPI(moduleName: string): ModuleAPI {
		return this.registeredModules[moduleName];
	}

	public selectModuleAPI(moduleName: string): Observable<ModuleAPI> {
		return this.registeredModules$.pipe(
			filter((modules) => modules[moduleName]),
			map((modules) => modules[moduleName])
		);
	}
}
