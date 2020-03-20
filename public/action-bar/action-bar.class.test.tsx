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

	it('Should set the content', () => {
		actionBar.setContent(<p>Hello World</p>);
		expect(actionBar.content).toEqual(<p>Hello World</p>);
	});

	it('Should clear the content', () => {
		actionBar.setContent(<p>Hello World</p>);
		actionBar.clearContent();
		expect(actionBar.content).toEqual(null);
	});

	it('Should show', () => {
		actionBar.show();
		expect(actionBar.isShown).toEqual(true);
	});

	it('Should hide', () => {
		actionBar.hide();
		expect(actionBar.isShown).toEqual(false);
	});
});
