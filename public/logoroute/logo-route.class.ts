export default class LogoRoute {
	private homeUrl: string = '';

	public getLogoUrl(): string {
		return this.homeUrl;
	}

	public setLogoUrl(url: string): void {
		this.homeUrl = url;
	}

	public resetLogoUrl(): void {
		this.homeUrl = '';
	}
}
