# Redactie Core

> Use this package in your custom `Redactie module` to hook into the main application.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)

## Installation

- Clone this repo to your local machine

> Now install all dependencies using npm

```shell
$ npm install

```

> Run tests to see if everything is working correctly

```shell
$ npm run test
```

## Usage

> Install the package using npm

```shell
$ npm install @redactie/redactie-core
```

```javascript
import Core from '@redactie/redactie-core'

```

## Features

### Modules
> Use the Modules API to expose your own API or to talk to an API from a dependency.

```javascript
// Expose an API to all consumers
Core.modules.exposeModuleApi('sites-module', {
	routes: routes,
});

// Get and use the API from a dependency
const depModuleAPI = Core.modules.getModuleAPI('name-of-dependency');
if (depModuleAPI) {
	depModuleAPI.doSomething();
}
```

### Routes
> Use the Routes API to manage the routes, site navigation and breadcrumbs

#### Register a route

You can register a route to hook into the main routing system of the `Redactie`
application. It will also add a navigation item to the main navigation when a `label` prop is provided.


```javascript
Core.routes.register({
	path: '/dashboard',
	component: Dashboard,
	label: 'Dashboard',
});

const SitesComponent: FC<{ route: ModuleRouteConfig }> = ({ route }) => {
	return (
		<>
			{Core.routes.render(route.routes)}
		</>
	);
};

```

#### Update route
```javascript
Core.routes.update({
	path: '/sites/one',
	component: SitesOne,
});
```

#### Update child routes

```javascript
Core.routes.updateChildRoutes('/sites', [{
	path: '/sites/one',
	component: SitesOne,
}]);
```

#### Listen for route changes

```javascript
Core.routes.routesChanges.subscribe(routes => ...);
```

#### Detailed description of the properties

| Props         | Datatype       | Required      | Default                       | Description             |
| -------------:| --------------:| -------------:| -----------------------------:| -----------------------:|
| path          | String         | yes           | /                             | Route path              |
| component     | React.Node     | yes           | /                             | React component         |
| exact         | Boolean        | no            | false                         | Exact route match       |
| strict        | Boolean        | no            | false                         | Strict route match      |
| label         | String         | no            | /                             | Used as navigation item |
| isDefaultRoute| Boolean        | no            | false                         | Default route when true |
| routes        | Array          | no            | /                             | Child routes            |
| breadcrumb    | Function,String| no            | defaults to path segment      | Breadcrumb name         |
| matchOptions  | Object         | no            | { exact: true, strict: false }| Route matchOptions      |


### Action bar
> Use the Action bar API to show actions in the main application

#### Show Action bar
```javascript
Core.actionBar.show();
```

#### Hide Action bar
```javascript
Core.actionBar.hide();
```

#### Set content to the action bar
```javascript
const ActionBarComponent = () => <div>Actions</div>
Core.actionBar.setContent(ActionBarComponent);
```

#### Clear all content
```javascript
Core.actionBar.clearContent();
```

### Breadcrumbs
> Use Breadcrumbs API to generate a nice Breadcrumb component

#### Default breadcrumbs

```javascript
import { useBreadcrumbs } from '@redactie/redactie-core'

const BreadcrumbsComponent = () => {
	const routes = [
		{
			path: '/dashboard',
			routes: [
				{
					path: '/dashboard/one',
				},
			],
		},
	];
	const breadcrumbs = useBreadcrumbs(routes);

	return {
		<>
			{breadcrumbs}
		</>
	};
}

// Result
// Dashboard > one

```

#### Custom breadcrumbs

If you don't want to use the default breadcrumb that we created, you can pass a `string` or a `function` to the `breadcrumb` prop
to create your own custom breadcrumb.


```javascript
import { useBreadcrumbs } from '@redactie/redactie-core'

const BreadcrumbsComponent = () => {
	const users = {
		'123': {
			name: 'John Doe',
		},
	};
	const routes = [
		{
			path: '/',
			breadcrumb: 'Home'
			routes: [
				{
					path: '/users',
					routes: [
						{
							path: '/users/:userId'
							breadcrumb: (props: BreadcrumbProps): string => {
								return users[props.match.params?.userId].name
							},
						}
					]
				},
			],
		},
	];
	const breadcrumbs = useBreadcrumbs(routes);

	return {
		<>
			{breadcrumbs}
		</>
	};
}

// Result
// Home > Users > John Doe

```

#### Disable default generated breadcrumbs

This package will attempt to create breadcrumbs for you based on the route section/segment. For example `/users` will automatically
create the breadcrumb `Users`. there are two ways to disable default breadcrumbs for a path.

*Option1:* Disable individiual default breadcrumbs by passing `breadcrumb: null` in the route config.
```javascript
const routes = [
	{
		path: '/users',
		breadcrumb: null
	},
];
```
*Option2:* Disable individiual default breadcrumbs by passing an `excludePaths` array in the `options` object
```javascript
const breadcrumbs = useBreadcrumbs(routes, {
	excludePaths: ['/users'],
});
```



