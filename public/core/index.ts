import Modules from '../modules/modules.class';
import Routes from '../routes/routes.class';
import { CoreOptions } from './core.types';

export default class Core {
	public modules: Modules;
	public routes: Routes;

	constructor({ pathPrefix }: CoreOptions) {
		this.modules = new Modules();
		this.routes = new Routes(pathPrefix);
	}
}
