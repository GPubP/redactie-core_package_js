import { Config } from '../config';
import { Loader } from '../loader';
import { Modules } from '../modules';
import { PrevNavigation } from '../preNavigation';
import Routes from '../routes/routes.class';

export default {
	modules: new Modules(),
	routes: new Routes(),
	config: new Config(),
	loader: new Loader(),
	prevNavigation: new PrevNavigation(),
};
