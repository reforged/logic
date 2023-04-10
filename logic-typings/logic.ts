declare module '@ioc:Reforged/Logic' {
  export type OperatorType =
    | 'contains'
    | 'not contains'
    | 'is'
    | 'is not'

  export type Conjunction = 'and' | 'or'

  export type RowCondition = {
    uid: string
    field: string
    operator: OperatorType
    value: string
  }

  type Couple = RowCondition | ConditionContract

  export interface ConditionContract {
    uid: string
    conjunction: Conjunction
    nodes: Couple[]
  }

}