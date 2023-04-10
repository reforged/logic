import { SymbContract, Prop, AndContract, OrContract, Type, DataSymb } from '@ioc:Reforged/Formule'
import {randomUUID} from "crypto";

export function Symb (value: string, type: Type): SymbContract {
    return {
      kind: 'symb',
      data: {
        value: value,
        type: type,
        uid: randomUUID()
      }
    }
  }

export function And (left: Prop, right: Prop): AndContract {
  return {
    kind: 'and',
    left,
    right
  }
}

export function Or (left: Prop, right: Prop): OrContract {
  return {
    kind: 'or',
    left,
    right
  }
}