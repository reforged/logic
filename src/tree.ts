import { TreeContract } from '@reforged/logic/types'

export class Tree<T> {
  private readonly tree: TreeContract<T>

  constructor(tree: TreeContract<T>) {
    this.tree = tree
  }

  public getTree (): TreeContract<T> {
    return this.tree
  }

  public calculateDepth (tree: TreeContract<T>): number {
    let maxDepth = 0
    for (const child of tree.nodes) {
      if ("nodes" in child && child.nodes.length) {
        const childDepth = this.calculateDepth(child)

        childDepth > maxDepth ? maxDepth = childDepth : null
      }
    }
    return maxDepth + 1
  }
}