declare module '@ioc:Reforged/Formule' {
  import { Conjunction, OperatorType } from '@ioc:Reforged/Logic'
  export type Type =
    | 'input'
    | 'select'

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
}