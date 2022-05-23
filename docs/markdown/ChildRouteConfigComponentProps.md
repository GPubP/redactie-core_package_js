# Interface: ChildRouteConfigComponentProps<Params\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Params` | extends { [K in keyof Params]?: string } = {} |

## Hierarchy

- `RouteComponentProps`<`Params`\>

  ↳ **`ChildRouteConfigComponentProps`**

## Table of contents

### Properties

- [history](../wiki/ChildRouteConfigComponentProps#history)
- [location](../wiki/ChildRouteConfigComponentProps#location)
- [match](../wiki/ChildRouteConfigComponentProps#match)
- [route](../wiki/ChildRouteConfigComponentProps#route)
- [staticContext](../wiki/ChildRouteConfigComponentProps#staticcontext)

## Properties

### history

• **history**: `History`<`PoorMansUnknown`\>

#### Inherited from

RouteComponentProps.history

#### Defined in

node_modules/@types/react-router/index.d.ts:74

___

### location

• **location**: `Location`<`PoorMansUnknown`\>

#### Inherited from

RouteComponentProps.location

#### Defined in

node_modules/@types/react-router/index.d.ts:75

___

### match

• **match**: `match`<`Params`\>

#### Inherited from

RouteComponentProps.match

#### Defined in

node_modules/@types/react-router/index.d.ts:76

___

### route

• **route**: [`ChildModuleRouteConfig`](../wiki/ChildModuleRouteConfig)

#### Defined in

public/routes/routes.types.ts:16

___

### staticContext

• `Optional` **staticContext**: `StaticContext`

#### Inherited from

RouteComponentProps.staticContext

#### Defined in

node_modules/@types/react-router/index.d.ts:77
