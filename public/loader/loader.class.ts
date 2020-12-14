import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoaderItem } from './loader.types';

export default class Loader {
	private loaderItems: LoaderItem[] = [];

	public loaderItems$: BehaviorSubject<LoaderItem[]> = new BehaviorSubject<LoaderItem[]>(
		this.loaderItems
	);
	public isLoading$: Observable<boolean> = this.loaderItems$.pipe(
		map((loaderItems) => !!loaderItems.find((loaderItem) => loaderItem.isLoading))
	);

	public get isLoading(): boolean {
		return !!this.loaderItems.find((loaderItem) => loaderItem.isLoading);
	}

	public addLoader(loaderItem: LoaderItem): void {
		this.loaderItems.push(loaderItem);
		this.loaderItems$.next(this.loaderItems);
	}

	public setLoading(key: string, isLoading: boolean): void {
		const loaderItem = this.loaderItems.find((item) => item.key === key);

		if (!loaderItem) {
			return;
		}

		loaderItem.isLoading = isLoading;
		this.loaderItems$.next(this.loaderItems);
	}

	public removeLoader(key: string): void {
		const loaderIndex = this.loaderItems.findIndex((item) => item.key === key);

		if (loaderIndex == -1) {
			return;
		}

		this.loaderItems.splice(loaderIndex, 1);
		this.loaderItems$.next(this.loaderItems);
	}
}
