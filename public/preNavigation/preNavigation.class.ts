import { Observable, ReplaySubject } from 'rxjs';
import { PreNavigationConfig } from './preNavigation.types';

export default class PreNavigation {
	private _preNavigationItems: PreNavigationConfig[] = [];
	private _preNavigationItemsSubject: ReplaySubject<PreNavigationConfig[]> = new ReplaySubject(1);

	public preNavigationItemsChanges: Observable<
		PreNavigationConfig[]
	> = this._preNavigationItemsSubject.asObservable();

	public get preNavigationItems(): PreNavigationConfig[] {
		return this._preNavigationItems;
	}

	public register(preNavigationConfig: PreNavigationConfig): void {
		if (!preNavigationConfig.component) {
			throw new Error('Rigister PreNavigation: Component is a required property');
		}

		this._preNavigationItems.push(preNavigationConfig);
		this._preNavigationItemsSubject.next(this._preNavigationItems);
	}
}
