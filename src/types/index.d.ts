declare module "@reforged/logic/types" {
  export type OperatorType =
    | 'contains'
    | 'not contains'
    | 'is'
    | 'is not'

  export type Conjunction = 'and' | 'or'

  export type Type =
    | 'input'
    | 'select'

  export type RowCondition<T> = {
    uid: string
    field: keyof T
    type: Type
    operator: OperatorType
    value: string
  }

  export interface ConditionContract<T> {
    uid: string
    kind: Conjunction
    nodes: (RowCondition<T> | ConditionContract<T>)[]
  }

  export type Un = 1
  export type Zero = 0

  export type valVerite = Un | Zero

  export type DataSymb = {
    uid: string
    value: string
    field: string
    operator: OperatorType
    type: Type
  }

  export interface SymbContract {
    kind: 'symb'
    data: DataSymb
  }

  export interface AndContract {
    kind: 'and'
    left: Prop
    right: Prop
  }

  export interface OrContract {
    kind: 'or'
    left: Prop
    right: Prop
  }

  export type Prop =
    | SymbContract
    | AndContract
    | OrContract

  export type TreeNode = {
    left?: TreeNode
    right?: TreeNode
    data?: SymbContract
    kind?: Conjunction
  }

  export function Symb (value: string): SymbContract
  export function And (left: Prop, right: Prop): AndContract
  export function Or (left: Prop, right: Prop): OrContract

  export interface TreeContract<T> {
    value: T,
    nodes: TreeContract<T>[]
  }
}