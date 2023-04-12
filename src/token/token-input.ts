import {Token} from "./token";
import {Prop, SymbContract} from '@reforged/logic/types'

export class TokenInput<T> extends Token<T>{
  constructor(prop: Prop, data: T) {
    super(prop, data)
    if (prop.kind !== 'symb' || prop.data.type !== 'input') {
      console.log("ERROR")
    }
  }

  public contains (): boolean {
    const data = this.getData()
    const prop = this.getProp() as SymbContract
    const value: string = data[prop.data.field as keyof T] as string
    return value.toLowerCase().includes(prop.data.value.toLowerCase())
  }

  public notContains (): boolean {
    return !this.contains()
  }

  public is (): boolean {
    const data = this.getData()
    const prop = this.getProp() as SymbContract
    const value: string = data[prop.data.field as keyof T] as string

    return value.toLowerCase() === prop.data.value.toLowerCase()
  }

  public isNot (): boolean {
    return !this.is()
  }

  public evaluate(): boolean {
    const prop = this.getProp() as SymbContract

    switch (prop.data.operator) {
      case "contains":
        return this.contains()
      case "not contains":
        return this.notContains()
      case "is not":
        return this.isNot()
      case "is":
        return this.is()
    }
  }
}