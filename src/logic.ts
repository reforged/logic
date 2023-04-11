import { ConditionContract } from '@ioc:Reforged/Logic'
import { TreeContract } from '@ioc:Reforged/Tree'
import { Tree } from './tree'
import {Formule} from "./formule";
import {Prop} from "@ioc:Reforged/Formule";
import {TokenInput} from "./token/token-input";
import {TokenSelect} from "./token/token-select";

type Un = 1
type Zero = 0
type valVerite = Un | Zero

function intSymb<T> (prop: Prop, data: T): valVerite {
  if (prop.kind !== 'symb') return 0
  switch (prop.data.type) {
    case "input":
      const tokenInput = new TokenInput<T>(prop, data)
      return tokenInput.evaluate() ? 1 : 0
    case "select":
      const tokenSelect = new TokenSelect<T>(prop, data)
      return tokenSelect.evaluate() ? 1 : 0
  }
  return 1
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
  private readonly condition: ConditionContract
  private readonly tree: Tree<ConditionContract>
  private readonly formule: Formule
  private readonly data: T[]

  constructor (condition: ConditionContract, data: T[]) {
    this.condition = condition
    this.data = data
    this.tree = new Tree<ConditionContract>(condition as TreeContract<ConditionContract>)
    this.formule = new Formule(condition)
  }

  public getCondition () {
    return this.condition
  }

  public getTree () {
    return this.tree
  }

  public getFormule () {
    return this.formule
  }

  public getDepth () {
    return this.tree.calculateDepth(this.tree.getTree())
  }

  public valVerite () {
    const li = []
    const fn = (prop: Prop) => {
     switch (prop.kind) {
       case "symb":
         return [prop.data.value]
       case "or":
       case "and":
         return [...fn(prop.left), ...fn(prop.right)]
     }
    }
    return fn(this.formule.getProposition())
  }

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
}