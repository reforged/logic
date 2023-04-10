declare module '@ioc:Reforged/Tree' {
  export interface TreeContract<T> {
    value: T,
    nodes: TreeContract<T>[]
  }
}