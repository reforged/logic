import { ConditionContract } from '@ioc:Reforged/Logic'
import { TreeContract } from '@ioc:Reforged/Tree'
import { Tree } from './tree'

export class Logic {
  private readonly condition: ConditionContract
  private readonly tree: Tree<ConditionContract>

  constructor (data: ConditionContract) {
    this.condition = data
    this.tree = new Tree<ConditionContract>(data as TreeContract<ConditionContract>)
  }

  public getCondition () {
    return this.condition
  }

  public getTree () {
    return this.tree
  }

  public getDepth () {
    return this.tree.calculateDepth(this.tree.getTree())
  }
}