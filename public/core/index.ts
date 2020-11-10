import { Config } from '../config';
import LogoRoute from '../logoroute/logo-route.class';
import { Modules } from '../modules';
import Routes from '../routes/routes.class';

export default {
	modules: new Modules(),
	routes: new Routes(),
	config: new Config(),
	homeroute: new LogoRoute(),
};
