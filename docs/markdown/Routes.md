# Interface: Routes

## Table of contents

### Properties

- [routesChanges](../wiki/Routes#routeschanges)

### Methods

- [getAll](../wiki/Routes#getall)
- [register](../wiki/Routes#register)
- [render](../wiki/Routes#render)
- [setPathPrefix](../wiki/Routes#setpathprefix)

## Properties

### routesChanges

• **routesChanges**: `Observable`<``null`` \| [`ModuleRouteConfig`](../wiki/ModuleRouteConfig)[]\>

#### Defined in

public/routes/routes.types.ts:81

## Methods

### getAll

▸ **getAll**(): [`ModuleRouteConfig`](../wiki/ModuleRouteConfig)[]

#### Returns

[`ModuleRouteConfig`](../wiki/ModuleRouteConfig)[]

#### Defined in

public/routes/routes.types.ts:80

___

### register

▸ **register**(`routeConfig`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `routeConfig` | [`ModuleRouteConfig`](../wiki/ModuleRouteConfig) |

#### Returns

`void`

#### Defined in

public/routes/routes.types.ts:79

___

### render

▸ **render**(`routeConfig`, `extraProps?`, `switchProps?`): `object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `routeConfig` | [`ModuleRouteConfig`](../wiki/ModuleRouteConfig)[] |
| `extraProps?` | `Record`<`string`, `unknown`\> |
| `switchProps?` | `SwitchProps` |

#### Returns

`object`

#### Defined in

public/routes/routes.types.ts:82

___

### setPathPrefix

▸ **setPathPrefix**(`prefix`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefix` | `string` |

#### Returns

`void`

#### Defined in

public/routes/routes.types.ts:87
