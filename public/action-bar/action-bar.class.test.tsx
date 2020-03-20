import React from 'react';
import ActionBar from './action-bar.class';

describe('ActionBar', () => {
	let actionBar: ActionBar;

	beforeEach(() => {
		actionBar = new ActionBar();
	});

	it('Should be able to expose a module api', () => {
		expect(actionBar).toBeInstanceOf(ActionBar);
	});

	it('Should set the content', (done) => {
		actionBar.content.subscribe((content) => {
			expect(content).toEqual(<p>Hello World</p>);
			done();
		});

		actionBar.setContent(<p>Hello World</p>);
	});

	it('Should clear the content', (done) => {
		actionBar.content.subscribe((content) => {
			expect(content).toEqual(null);
			done();
		});

		actionBar.clearContent();
	});

	it('Should show', (done) => {
		actionBar.isShown.subscribe((content) => {
			expect(content).toEqual(true);
			done();
		});

		actionBar.show();
	});

	it('Should hide', (done) => {
		actionBar.isShown.subscribe((content) => {
			expect(content).toEqual(false);
			done();
		});

		actionBar.hide();
	});
});
