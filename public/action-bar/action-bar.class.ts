export default class ActionBar {
	public isShown = false;
	public content: React.ReactNode;

	show(): void {
		this.isShown = true;
	}

	hide(): void {
		this.isShown = true;
	}

	setContent(content: React.ReactNode): void {
		this.content = content;
	}

	clearContent(): void {
		this.content = null;
	}
}
