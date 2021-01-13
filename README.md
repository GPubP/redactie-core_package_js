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
Core.modules.exposeModuleApi('name-of-dependency', {
	doSomething: () => 'Do something',
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
	path: '/users',
	component: Dashboard,
	label: 'Users',
	routes: [
		{
			path: '/users/:userId',
			component: UserComponent,
		},
	],
});

const UsersComponent: FC<{ route: ModuleRouteConfig }> = ({ route }) => {
	return (
		<>
			// Render child routes => /users/:userId
			{Core.routes.render(route.routes)}
		</>
	);
};

```

#### Update route
```javascript
Core.routes.update({
	path: '/users',
	component: UsersComponent,
});
```

#### Update child routes

```javascript
Core.routes.updateChildRoutes('/users', [{
	path: '/users/:userId',
	component: UserComponent,
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
| guardOptions  | Object         | no            | /                             | Guard options           |

### Guards
> Use guards to prevent the user from accessing routes

We are using the [react router guards](https://github.com/Upstatement/react-router-guards) package

```javascript
interface GuardOptions {
  guards?: GuardFunction[];
  ignoreGlobal?: boolean;
  loading?: PageComponent;
  error?: PageComponent;
}
```
| Prop           | Optional | Description                                                 | Notes                                                                                                                                                                           |
| -------------- | :------: | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `guards`       |    ✅    | the guards to set for this route                            | It's important to note that guards set by the `GuardedRoute` will be added to the _end_ of the middleware queue set by its parent [`GuardedProvider`](https://github.com/Upstatement/react-router-guards/blob/master/docs/guard-provider.md). |
| `ignoreGlobal` |    ✅    | whether to ignore guards set by parent `GuardedProvider`s   |                                                                                                                                                                                 |
| `loading`      |    ✅    | the [loading page](https://github.com/Upstatement/react-router-guards/blob/master/docs/page-components.md) for this route | Overrides the global loading page, if value provided.                                                                                                                           |
| `error`        |    ✅    | the [error page](https://github.com/Upstatement/react-router-guards/blob/master/docs/page-components.md) for this route   | Overrides the global error page, if value provided.                                                                                                                             |

```javascript
const requireLogin = (to, from, next) => {
  if (to.meta.auth) {
    if (getIsLoggedIn()) {
      next();
    }
    next.redirect('/login');
  } else {
    next();
  }
};

const UsersComponent = () => {
	const routes = [{
		path: '/users',
		component: Dashboard,
		label: 'Users',
		// Guards on route level
		guardOptions: {
			guards: [],
		}
	}];
	return (
		<>
			{Core.routes.render(routes, {}, {}, {
				// GuardProvider options
				loading: LoadingPage,
				error: ErrorPage,
				guards: [requireLogin]
			})}
		</>
	);
};

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

If you don't want to use the default breadcrumb that we created, you can pass a `string` or a `component` to the `breadcrumb` prop
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
							breadcrumb(props: BreadcrumbComponentProps) {
								return <>{users[props.match.params?.userId].name}</>
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

#### Use your own breadcrumbs or combine them with the ones that are genarated based on the current location

This can be useful when you don't to show breadcrumbs based on the current location or if you want to add some
custom breadcrumbs before rendering the generated ones.

```javascript
import { useBreadcrumbs } from '@redactie/redactie-core'

const BreadcrumbsComponent = () => {
	const routes = [
		{
			path: '/',
			breadcrumb: 'Home'
		},
	];
	const breadcrumbs = useBreadcrumbs(routes, {
		extraBreadcrumbs: [
			{
				name: 'Extra breadcrumb',
				target: '/some/path'
			}
		]
	});

	return {
		<>
			{breadcrumbs}
		</>
	};
}

// Result
// Extra breadcrumb > Home
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
*Option2:* Disable individiual default breadcrumbs by passing `breadcrumb: false` in the route config.
```javascript
const routes = [
	{
		path: '/users',
		breadcrumb: false
	},
];
```
*Option3:* Disable individiual default breadcrumbs by passing an `excludePaths` array in the `options` object
```javascript
const breadcrumbs = useBreadcrumbs(routes, {
	excludePaths: ['/users'],
});
```



