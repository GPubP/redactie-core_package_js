import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoaderItem } from './loader.types';

export default class Loader {
	private _loaderItems$: BehaviorSubject<LoaderItem[]> = new BehaviorSubject<LoaderItem[]>([]);

	public loaderItems$: Observable<LoaderItem[]> = this._loaderItems$.asObservable();
	public isLoading$: Observable<boolean> = this.loaderItems$.pipe(
		map((loaderItems) => !!loaderItems.find((loaderItem) => loaderItem.isLoading))
	);

	public get loaderItems(): LoaderItem[] {
		return this._loaderItems$.value;
	}

	public get isLoading(): boolean {
		return !!this.loaderItems.find((loaderItem) => loaderItem.isLoading);
	}

	public addLoader(loaderItem: LoaderItem): void {
		this._loaderItems$.next([...this.loaderItems, loaderItem]);
	}

	public setLoading(key: string, isLoading: boolean): void {
		const loaderItem = this.loaderItems.find((item) => item.key === key);

		if (!loaderItem) {
			return;
		}

		loaderItem.isLoading = isLoading;
		this._loaderItems$.next(this.loaderItems);
	}

	public removeLoader(key: string): void {
		const loaderIndex = this.loaderItems.findIndex((item) => item.key === key);

		if (loaderIndex == -1) {
			return;
		}

		const oldLoaderItems = this.loaderItems;

		oldLoaderItems.splice(loaderIndex, 1);
		this._loaderItems$.next(oldLoaderItems);
	}
}
