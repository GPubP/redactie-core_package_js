/* eslint-disable @typescript-eslint/no-explicit-any */
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

class Config {
	private dataSubject = new BehaviorSubject<Record<string, any>>({});
	public value = this.dataSubject.value;

	public add(data: Record<string, any>): void {
		this.dataSubject.next({
			...this.dataSubject.getValue(),
			...data,
		});
	}

	public selectValue(key?: string): Observable<Record<string, any>> {
		if (key) {
			return this.dataSubject.asObservable().pipe(map((config) => config[key]));
		}
		return this.dataSubject.asObservable();
	}

	public getValue(key?: string): Record<string, any> {
		if (key) {
			return this.dataSubject.getValue()[key];
		}

		return this.dataSubject.getValue();
	}
}

export default Config;
