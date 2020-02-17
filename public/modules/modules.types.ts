export interface ModuleAPI {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

export interface Modules {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	exposeModuleApi: (moduleName: string, api: { [key: string]: any }) => void;
	getModuleAPI: (moduleName: string) => ModuleAPI;
}
