import { skip } from 'rxjs/operators';
import Loader from './loader.class';

describe('[UNIT - Loader]', () => {
	it('should add a loader', () => {
		const loader = new Loader();

		loader.addLoader({
			key: 'loader-1',
			label: 'Entity-x',
			isLoading: true,
		});

		expect(loader.isLoading).toBeTruthy();
		expect(loader.loaderItems$.value).toContainEqual({
			key: 'loader-1',
			label: 'Entity-x',
			isLoading: true,
		});
	});

	it('should set Loading to true', () => {
		const loader = new Loader();

		loader.addLoader({
			key: 'loader-1',
			label: 'Entity-x',
			isLoading: false,
		});

		expect(loader.isLoading).toBeFalsy();

		loader.setLoading('loader-1', true);

		expect(loader.isLoading).toBeTruthy();
	});

	it('should set Loading to false', () => {
		const loader = new Loader();

		loader.addLoader({
			key: 'loader-1',
			label: 'Entity-x',
			isLoading: true,
		});

		expect(loader.isLoading).toBeTruthy();

		loader.setLoading('loader-1', false);

		expect(loader.isLoading).toBeFalsy();
	});

	it('should emit new loading event on new loader set', (done: jest.DoneCallback) => {
		const loader = new Loader();

		loader.addLoader({
			key: 'loader-1',
			label: 'Entity-x',
			isLoading: false,
		});

		loader.isLoading$
			.pipe(
				// Skip initial value
				skip(1)
			)
			.subscribe((isLoading) => {
				expect(isLoading).toBeTruthy();
				done();
			});

		loader.addLoader({
			key: 'loader-2',
			label: 'Entity-y',
			isLoading: true,
		});
	});

	it('should emit new loadingItems on new loader set', (done: jest.DoneCallback) => {
		const loader = new Loader();

		loader.addLoader({
			key: 'loader-1',
			label: 'Entity-x',
			isLoading: false,
		});

		loader.loaderItems$
			.pipe(
				// Skip initial value
				skip(1)
			)
			.subscribe((loaderItems) => {
				expect(loaderItems).toEqual([
					{
						key: 'loader-1',
						label: 'Entity-x',
						isLoading: false,
					},
					{
						key: 'loader-2',
						label: 'Entity-y',
						isLoading: true,
					},
				]);
				done();
			});

		loader.addLoader({
			key: 'loader-2',
			label: 'Entity-y',
			isLoading: true,
		});
	});

	it('should remove a loader', () => {
		const loader = new Loader();

		loader.addLoader({
			key: 'loader-1',
			label: 'Entity-x',
			isLoading: false,
		});
		loader.addLoader({
			key: 'loader-2',
			label: 'Entity-y',
			isLoading: true,
		});

		expect(loader.isLoading).toBeTruthy();

		loader.removeLoader('loader-2');

		expect(loader.isLoading).toBeFalsy();
	});

	it('should emit new loading event on loader remove', (done: jest.DoneCallback) => {
		const loader = new Loader();

		loader.addLoader({
			key: 'loader-1',
			label: 'Entity-x',
			isLoading: false,
		});
		loader.addLoader({
			key: 'loader-2',
			label: 'Entity-y',
			isLoading: true,
		});

		expect(loader.isLoading).toBeTruthy();

		loader.isLoading$
			.pipe(
				// Skip initial value
				skip(1)
			)
			.subscribe((isLoading) => {
				expect(isLoading).toBeFalsy();
				done();
			});

		loader.removeLoader('loader-2');
	});

	it('should emit new loader items state when loader is removed', (done: jest.DoneCallback) => {
		const loader = new Loader();

		loader.addLoader({
			key: 'loader-1',
			label: 'Entity-x',
			isLoading: false,
		});
		loader.addLoader({
			key: 'loader-2',
			label: 'Entity-y',
			isLoading: true,
		});

		loader.loaderItems$
			.pipe(
				// Skip initial value
				skip(1)
			)
			.subscribe((loaderItems) => {
				expect(loaderItems).toEqual([
					{
						key: 'loader-1',
						label: 'Entity-x',
						isLoading: false,
					},
				]);
				done();
			});

		loader.removeLoader('loader-2');
	});
});
