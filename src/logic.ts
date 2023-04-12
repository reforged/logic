import { ConditionContract, valVerite, Prop } from '@reforged/logic/types'
import { Formule } from './formule'
import { TokenInput } from './token/token-input'
import { TokenSelect } from './token/token-select'

function intSymb<T> (prop: Prop, data: T): valVerite {
  if (prop.kind !== 'symb') return 0
  console.log(prop, data)
  if (prop.data.type === 'input') {
    const tokenInput = new TokenInput<T>(prop, data)
    return tokenInput.evaluate() ? 1 : 0
  } if (prop.data.type === 'select') {
    const tokenSelect = new TokenSelect<T>(prop, data)
    return tokenSelect.evaluate() ? 1 : 0
  }
  return 0
}

function intAnd (v1: valVerite, v2: valVerite): valVerite {
  if (v1 === 1 && v2 === 1) return 1
  return 0
}

function intOr (v1: valVerite, v2: valVerite): valVerite {
  if (v1 === 1 || v2 === 1) return 1
  return 0
}

export class Logic<T> {
  private readonly condition: ConditionContract<T>
  private readonly formule: Formule<T>
  private readonly data: T[]

  constructor (condition: ConditionContract<T>, data: T[]) {
    this.condition = condition
    this.data = data
    this.formule = new Formule<T>(condition)
  }

  public getCondition () {
    return this.condition
  }

  public getFormule () {
    return this.formule
  }

  /**
   * Allows for an interpretation of
   * type T to return the truth value
   * @param data
   */
  public execute (data: T) {
    const fn = (prop: Prop) => {
      switch (prop.kind) {
        case "and":
          return intAnd(fn(prop.left), fn(prop.right))
        case "or":
          return intOr(fn(prop.left), fn(prop.right))
        case "symb":
          return intSymb<T>(prop, data)
      }
    }

    return fn(this.getFormule().getProposition())
  }

  /**
   * Returns an array of type T where each item
   * checks for an interpretation of the truth value.
   *
   * @return T[]
   */
  public filter (): T[] {
    return this.data.filter((item) => {
      if (this.execute(item)) return item
    })
  }
}