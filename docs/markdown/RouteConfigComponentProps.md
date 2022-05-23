# Interface: RouteConfigComponentProps<Params\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Params` | extends { [K in keyof Params]?: string } = {} |

## Hierarchy

- `RouteComponentProps`<`Params`\>

  ↳ **`RouteConfigComponentProps`**

## Table of contents

### Properties

- [history](../wiki/RouteConfigComponentProps#history)
- [location](../wiki/RouteConfigComponentProps#location)
- [match](../wiki/RouteConfigComponentProps#match)
- [route](../wiki/RouteConfigComponentProps#route)
- [staticContext](../wiki/RouteConfigComponentProps#staticcontext)

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

• **route**: [`ModuleRouteConfig`](../wiki/ModuleRouteConfig)

#### Defined in

public/routes/routes.types.ts:10

___

### staticContext

• `Optional` **staticContext**: `StaticContext`

#### Inherited from

RouteComponentProps.staticContext

#### Defined in

node_modules/@types/react-router/index.d.ts:77
