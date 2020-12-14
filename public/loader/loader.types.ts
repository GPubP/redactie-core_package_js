/**
 * LoaderItem
 *
 * @member {string} key Unique key to identify the loader
 * @member {string} [label] Optional label that could be shown to the user in the future
 * @member {boolean} isLoading Specifies the loading state
 */
export interface LoaderItem {
	key: string;
	label?: string;
	isLoading: boolean;
}
