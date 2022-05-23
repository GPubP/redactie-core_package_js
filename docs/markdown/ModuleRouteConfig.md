# Interface: ModuleRouteConfig

## Hierarchy

- [`BaseRouteConfig`](../wiki/BaseRouteConfig)

  ↳ **`ModuleRouteConfig`**

## Table of contents

### Properties

- [breadcrumb](../wiki/ModuleRouteConfig#breadcrumb)
- [component](../wiki/ModuleRouteConfig#component)
- [exact](../wiki/ModuleRouteConfig#exact)
- [guardOptions](../wiki/ModuleRouteConfig#guardoptions)
- [isDefaultRoute](../wiki/ModuleRouteConfig#isdefaultroute)
- [key](../wiki/ModuleRouteConfig#key)
- [label](../wiki/ModuleRouteConfig#label)
- [matchOptions](../wiki/ModuleRouteConfig#matchoptions)
- [navigation](../wiki/ModuleRouteConfig#navigation)
- [path](../wiki/ModuleRouteConfig#path)
- [redirect](../wiki/ModuleRouteConfig#redirect)
- [routes](../wiki/ModuleRouteConfig#routes)
- [strict](../wiki/ModuleRouteConfig#strict)

## Properties

### breadcrumb

• `Optional` **breadcrumb**: ``null`` \| `string` \| ``false`` \| `ComponentClass`<{}, `any`\> \| `FunctionComponent`<{}\> \| `ComponentClass`<`any`, `any`\> \| `FunctionComponent`<`any`\>

#### Inherited from

[BaseRouteConfig](../wiki/BaseRouteConfig).[breadcrumb](../wiki/BaseRouteConfig#breadcrumb)

#### Defined in

public/routes/routes.types.ts:59

___

### component

• **component**: `ComponentType`<`any`\>

#### Defined in

public/routes/routes.types.ts:70

___

### exact

• `Optional` **exact**: `boolean`

#### Inherited from

[BaseRouteConfig](../wiki/BaseRouteConfig).[exact](../wiki/BaseRouteConfig#exact)

#### Defined in

public/routes/routes.types.ts:56

___

### guardOptions

• `Optional` **guardOptions**: [`RouteGuardConfig`](../wiki/RouteGuardConfig)

#### Inherited from

[BaseRouteConfig](../wiki/BaseRouteConfig).[guardOptions](../wiki/BaseRouteConfig#guardoptions)

#### Defined in

public/routes/routes.types.ts:60

___

### isDefaultRoute

• `Optional` **isDefaultRoute**: `boolean`

#### Defined in

public/routes/routes.types.ts:71

___

### key

• `Optional` **key**: `string`

#### Inherited from

[BaseRouteConfig](../wiki/BaseRouteConfig).[key](../wiki/BaseRouteConfig#key)

#### Defined in

public/routes/routes.types.ts:52

___

### label

• `Optional` **label**: `string`

#### Inherited from

[BaseRouteConfig](../wiki/BaseRouteConfig).[label](../wiki/BaseRouteConfig#label)

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

#### Inherited from

[BaseRouteConfig](../wiki/BaseRouteConfig).[matchOptions](../wiki/BaseRouteConfig#matchoptions)

#### Defined in

public/routes/routes.types.ts:62

___

### navigation

• `Optional` **navigation**: [`RouteNavigationConfig`](../wiki/RouteNavigationConfig)

#### Inherited from

[BaseRouteConfig](../wiki/BaseRouteConfig).[navigation](../wiki/BaseRouteConfig#navigation)

#### Defined in

public/routes/routes.types.ts:61

___

### path

• **path**: `string`

#### Inherited from

[BaseRouteConfig](../wiki/BaseRouteConfig).[path](../wiki/BaseRouteConfig#path)

#### Defined in

public/routes/routes.types.ts:54

___

### redirect

• `Optional` **redirect**: `string`

#### Inherited from

[BaseRouteConfig](../wiki/BaseRouteConfig).[redirect](../wiki/BaseRouteConfig#redirect)

#### Defined in

public/routes/routes.types.ts:58

___

### routes

• `Optional` **routes**: [`ChildModuleRouteConfig`](../wiki/ChildModuleRouteConfig)[]

#### Inherited from

[BaseRouteConfig](../wiki/BaseRouteConfig).[routes](../wiki/BaseRouteConfig#routes)

#### Defined in

public/routes/routes.types.ts:55

___

### strict

• `Optional` **strict**: `boolean`

#### Inherited from

[BaseRouteConfig](../wiki/BaseRouteConfig).[strict](../wiki/BaseRouteConfig#strict)

#### Defined in

public/routes/routes.types.ts:57
