import { Config } from '../config';
import { Modules } from '../modules';
import Routes from '../routes/routes.class';

export default {
	modules: new Modules(),
	routes: new Routes(),
	config: new Config(),
};
