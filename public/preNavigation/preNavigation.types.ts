import { ComponentType } from 'react';

export interface PreNavigationConfig {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: ComponentType<any>;
	includePaths?: string[];
	excludePaths?: string[];
}
