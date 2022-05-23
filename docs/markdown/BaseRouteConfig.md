# Interface: BaseRouteConfig

## Hierarchy

- **`BaseRouteConfig`**

  ↳ [`ModuleRouteConfig`](../wiki/ModuleRouteConfig)

  ↳ [`ChildModuleRouteConfig`](../wiki/ChildModuleRouteConfig)

## Indexable

▪ [propName: `string`]: `any`

## Table of contents

### Properties

- [breadcrumb](../wiki/BaseRouteConfig#breadcrumb)
- [exact](../wiki/BaseRouteConfig#exact)
- [guardOptions](../wiki/BaseRouteConfig#guardoptions)
- [key](../wiki/BaseRouteConfig#key)
- [label](../wiki/BaseRouteConfig#label)
- [matchOptions](../wiki/BaseRouteConfig#matchoptions)
- [navigation](../wiki/BaseRouteConfig#navigation)
- [path](../wiki/BaseRouteConfig#path)
- [redirect](../wiki/BaseRouteConfig#redirect)
- [routes](../wiki/BaseRouteConfig#routes)
- [strict](../wiki/BaseRouteConfig#strict)

## Properties

### breadcrumb

• `Optional` **breadcrumb**: ``null`` \| `string` \| ``false`` \| `ComponentClass`<{}, `any`\> \| `FunctionComponent`<{}\> \| `ComponentClass`<`any`, `any`\> \| `FunctionComponent`<`any`\>

#### Defined in

public/routes/routes.types.ts:59

___

### exact

• `Optional` **exact**: `boolean`

#### Defined in

public/routes/routes.types.ts:56

___

### guardOptions

• `Optional` **guardOptions**: [`RouteGuardConfig`](../wiki/RouteGuardConfig)

#### Defined in

public/routes/routes.types.ts:60

___

### key

• `Optional` **key**: `string`

#### Defined in

public/routes/routes.types.ts:52

___

### label

• `Optional` **label**: `string`

#### Defined in

public/routes/routes.types.ts:53

___

### matchOptions

• `Optional` **matchOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `exact?` | `boolean` |
| `strict?` | `boolean` |

#### Defined in

public/routes/routes.types.ts:62

___

### navigation

• `Optional` **navigation**: [`RouteNavigationConfig`](../wiki/RouteNavigationConfig)

#### Defined in

public/routes/routes.types.ts:61

___

### path

• **path**: `string`

#### Defined in

public/routes/routes.types.ts:54

___

### redirect

• `Optional` **redirect**: `string`

#### Defined in

public/routes/routes.types.ts:58

___

### routes

• `Optional` **routes**: [`ChildModuleRouteConfig`](../wiki/ChildModuleRouteConfig)[]

#### Defined in

public/routes/routes.types.ts:55

___

### strict

• `Optional` **strict**: `boolean`

#### Defined in

public/routes/routes.types.ts:57
