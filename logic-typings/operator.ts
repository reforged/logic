declare module '@ioc:Reforged/Operator' {
  export interface InstructionContract {
    getName(): string
  }

  export interface OperatorContract extends InstructionContract {
    process (a,b)
  }
}