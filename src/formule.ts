import { And, Symb } from './utils'
import { ConditionContract, Prop, SymbContract } from '@reforged/logic/types'

function affiche_symb(prop: Prop): string {
  switch (prop.kind) {
    case "symb":
      return prop.data.value;
    case "and":
      return "∧";
    case "or":
      return "∨";
    default:
      throw new Error("Invalid proposition");
  }
}

function priority (prop: Prop) {
  switch (prop.kind) {
    case "or":
      return 0
    case "and":
      return 1
    case 'symb':
      return 2
    default:
      return 3
  }
}

function isFilterData<T> (node): node is ConditionContract<T> {
  return (node as ConditionContract<T>).kind !== undefined
}

export class Formule<T> {
  protected proposition: Prop
  private condition: ConditionContract<T>

  constructor(condition: ConditionContract<T>) {
    this.condition = condition
    this.proposition = this.buildTree(condition)
  }

  /**
   * return the proposition
   */
  public getProposition () {
    return this.proposition
  }

  /**
   * return the number of symb in proposition
   * @param prop
   */
  public nbc (prop: Prop) {
    switch (prop.kind) {
      case 'symb':
        return 0
      case 'and':
      case 'or':
        return 1 + this.nbc(prop.left) + this.nbc(prop.right)
    }
  }

  /**
   * Create prosition with data (ConditionContract)
   * @param data
   */
  public buildTree (data: ConditionContract<T>): Prop {
    const { nodes, kind } = data

    if (nodes.length === 1) {
      const data = nodes[0]
      if (isFilterData<T>(data)) {
        return this.buildTree(data)
      } else {
        return { data, kind: 'symb' } as SymbContract
      }
    }
    const middle = Math.floor(nodes.length / 2)
    const leftNodes = nodes.slice(0, middle)
    const rightNodes = nodes.slice(middle)
    const left = this.buildTree({ uid: '', kind, nodes: leftNodes})
    const right = this.buildTree({ uid: '', kind, nodes: rightNodes})

    return { left, right, kind } as Prop
  }


  /**
   * Gives the depth of the proposal
   * @public
   * @return number
   */
  public prof (): number {
    const fn = (prop: Prop) => {
      switch (prop.kind) {
        case "symb":
          return 0
        case "and":
        case "or":
          return 1 + Math.max(fn(prop.left), fn(prop.right))
      }
    }

    return fn(this.proposition)
  }

  /**
   * Adds if the value is not present
   * @param li
   * @param x
   * @return string[]
   * @private
   */
  private addsIfNotIn (li: string[], x: string): string[] {
    if (!li.length) {
      return [x]
    }
    const [e, ...l] = li
    if (e === x) {
      return [e, ...l]
    }

    return [e, ...this.addsIfNotIn(l,x)]
  }

  /**
   * Allows you to join two lists and avoid duplication
   * @param l1
   * @param l2
   * @private
   */
  private union (l1: string[], l2: string[]): string[] {
    if (!l1.length) return l2
    if (!l2.length) return l1


    const [e, ...l] = l1;
    return this.addsIfNotIn(this.union(l, l2), e);
  }

  /**
   * Lists the values of each props
   */
  public sp(): string[] {
    const fn = (prop: Prop) => {
      switch (prop.kind) {
        case "symb":
          return [prop.data.value];
        case "and":
        case "or":
          return this.union(fn(prop.left), fn(prop.right));
      }
    }
    return fn(this.proposition)
  }

  /**
   * Allows you to display a well-formed formula in an optimised way
   * @param fbf
   */
  public affiche (): string {

    function fn (fbf: Prop, symb: Prop) {
      const prio = priority(fbf) >= priority(symb)
      switch (fbf.kind) {
        case "symb":
          return affiche_symb(fbf)
        case "and":
        case "or":
          if (prio) {
            return (
              fn(fbf.left, fbf) +
              " " +
              affiche_symb(fbf) +
              " " +
              fn(fbf.right, fbf)
            );
          } else {
            return (
              "(" +
              fn(fbf.left, fbf) +
              " " +
              affiche_symb(fbf) +
              " " +
              fn(fbf.right, fbf) +
              ")"
            );
          }
      }
    }

    return fn(
      this.proposition,
      And(Symb('s', 'input'), Symb('s', 'input'))
    )
  }
}