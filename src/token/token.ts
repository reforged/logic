import { Prop } from '@ioc:Reforged/Formule'

/**
 * @Token
 * @reforged/logic
 *
 * Abstract class to define a token.
 * The token is an identifier to recognize
 * a data item that is part of a SelectMenu or a
 * value entered by the user
 */
export abstract class Token<T> {
  private readonly prop: Prop
  private readonly data: T

  protected constructor(prop: Prop, data: T) {
    this.prop = prop
    this.data = data
  }

  /**
   * return prop
   * @type Prop
   */
  public getProp(): Prop {
    return this.prop
  }

  /**
   * return data
   * @type T
   */
  public getData (): T {
    return this.data
  }
}