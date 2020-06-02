import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { ModuleAPI, ModuleAPIMap } from './modules.types';

class Modules {
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

	public getModuleAPI<T>(moduleName: string): T {
		return this.registeredModules[moduleName];
	}

	public selectModuleAPI<T>(moduleName: string): Observable<T> {
		return this.registeredModules$.pipe(
			filter((modules: ModuleAPIMap) => modules[moduleName]),
			map((modules: ModuleAPIMap) => modules[moduleName] as T)
		);
	}
}

export default Modules;
