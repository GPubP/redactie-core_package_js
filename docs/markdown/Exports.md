# @redactie/redactie-core

## Table of contents

### Interfaces

- [BaseRouteConfig](../wiki/BaseRouteConfig)
- [Breadcrumb](../wiki/Breadcrumb)
- [BreadcrumbOptions](../wiki/BreadcrumbOptions)
- [ChildModuleRouteConfig](../wiki/ChildModuleRouteConfig)
- [ChildRouteConfigComponentProps](../wiki/ChildRouteConfigComponentProps)
- [CustomLinkProps](../wiki/CustomLinkProps)
- [GetBreadcrumbMatchProps](../wiki/GetBreadcrumbMatchProps)
- [GetBreadcrumbsProps](../wiki/GetBreadcrumbsProps)
- [LoaderItem](../wiki/LoaderItem)
- [Location](../wiki/Location)
- [Match](../wiki/Match)
- [ModuleAPI](../wiki/ModuleAPI)
- [ModuleAPIMap](../wiki/ModuleAPIMap)
- [ModuleRouteConfig](../wiki/ModuleRouteConfig)
- [PreNavigationConfig](../wiki/PreNavigationConfig)
- [RouteConfigComponentProps](../wiki/RouteConfigComponentProps)
- [RouteGuardConfig](../wiki/RouteGuardConfig)
- [RouteNavigationConfig](../wiki/RouteNavigationConfig)
- [RouteOptions](../wiki/RouteOptions)
- [Routes](../wiki/Routes)

### Type aliases

- [BreadcrumbComponentProps](../wiki/Exports#breadcrumbcomponentprops)
- [CanShownFunction](../wiki/Exports#canshownfunction)
- [GuardFunction](../wiki/Exports#guardfunction)
- [Next](../wiki/Exports#next)
- [PageComponent](../wiki/Exports#pagecomponent)

### Variables

- [default](../wiki/Exports#default)

### Functions

- [useBreadcrumbs](../wiki/Exports#usebreadcrumbs)

## Type aliases

### BreadcrumbComponentProps

Ƭ **BreadcrumbComponentProps**: [`Breadcrumb`](../wiki/Breadcrumb)

#### Defined in

public/breadcrumbs/useBreadcrumbs.types.ts:11

___

### CanShownFunction

Ƭ **CanShownFunction**: (`meta`: `Record`<`string`, `unknown`\>, `next`: [`Next`](../wiki/Exports#next)) => `void`

#### Type declaration

▸ (`meta`, `next`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `meta` | `Record`<`string`, `unknown`\> |
| `next` | [`Next`](../wiki/Exports#next) |

##### Returns

`void`

#### Defined in

public/routes/routes.types.ts:96

___

### GuardFunction

Ƭ **GuardFunction**: (`to`: `GuardToRoute`, `from`: `GuardFunctionRouteProps` \| ``null``, `next`: `Next`) => `void`

#### Type declaration

▸ (`to`, `from`, `next`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `to` | `GuardToRoute` |
| `from` | `GuardFunctionRouteProps` \| ``null`` |
| `next` | `Next` |

##### Returns

`void`

#### Defined in

node_modules/@redactie/react-router-guards/dist/types.d.ts:45

___

### Next

Ƭ **Next**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

public/routes/routes.types.ts:94

___

### PageComponent

Ƭ **PageComponent**: `ComponentType` \| ``null`` \| `undefined` \| `string` \| `boolean` \| `number`

Page Component Types

#### Defined in

node_modules/@redactie/react-router-guards/dist/types.d.ts:49

## Variables

### default

• **default**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `config` | `Config` |
| `loader` | `default` |
| `modules` | `Modules` |
| `preNavigation` | `default` |
| `routes` | `default` |

#### Defined in

public/core/index.ts:7

## Functions

### useBreadcrumbs

▸ **useBreadcrumbs**(`routes`, `options?`): `ReactNode`

The useBreadcrumbs hook will return a breadcrumb component based on the given routes and options

#### Parameters

| Name | Type |
| :------ | :------ |
| `routes` | [`ModuleRouteConfig`](../wiki/ModuleRouteConfig)[] |
| `options?` | [`BreadcrumbOptions`](../wiki/BreadcrumbOptions) |

#### Returns

`ReactNode`

#### Defined in

public/breadcrumbs/useBreadcrumbs.tsx:180
