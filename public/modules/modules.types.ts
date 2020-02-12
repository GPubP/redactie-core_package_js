import { FunctionComponent } from 'react';

export interface ModuleAPI {
	mainRouteComponent?: FunctionComponent;
	[key: string]: any;
}

export interface Modules {
	exposeModuleApi: (moduleName: string, api: {[key: string]: any}) => void;
	getModuleAPI: (moduleName: string) => ModuleAPI;
}
