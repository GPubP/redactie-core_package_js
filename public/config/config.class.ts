/* eslint-disable @typescript-eslint/no-explicit-any */
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

class Config {
	private dataSubject = new BehaviorSubject<Record<string, any>>({});
	public value = this.dataSubject.value;

	public add(data: Record<string, any>): void {
		this.dataSubject.next({
			...this.dataSubject.value,
			...data,
		});
	}

	public selectValue(key?: string): Observable<Record<string, any>> {
		if (key) {
			return this.dataSubject.asObservable().pipe(
				take(1),
				map((config) => config[key])
			);
		}
		return this.dataSubject.asObservable();
	}

	public getValue(key?: string): Record<string, any> {
		if (key) {
			return this.value[key];
		}

		return this.value;
	}
}

export default Config;
