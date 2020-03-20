import { ReplaySubject } from 'rxjs';

export default class ActionBar {
	private isShown: ReplaySubject<boolean> = new ReplaySubject(1);
	public content: ReplaySubject<React.ReactNode> = new ReplaySubject(1);

	show(): void {
		this.isShown.next(true);
	}

	hide(): void {
		this.isShown.next(false);
	}

	setContent(content: React.ReactNode): void {
		this.content.next(content);
	}

	clearContent(): void {
		this.content.next(null);
	}
}
