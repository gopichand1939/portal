export type { ModuleNode, ModuleNodeType } from './types'
export {
  aptitudeModule,
  reasoningModule,
  verbalModule,
  pythonModule,
  getLearningModules,
  studyContentMap,
  exerciseContentMap,
  assignmentContentMap,
} from './loader.generated'

export const moduleProgressDefault = { aptitude: 10, reasoning: 10, verbal: 10, python: 10 }

import type { ModuleNode } from './types'

export function findNodeById(
  root: ModuleNode,
  id: string,
  path: string[] = []
): { node: ModuleNode; path: string[] } | null {
  const currentPath = [...path, root.label]
  if (root.id === id) return { node: root, path: currentPath }
  if (root.children) {
    for (const child of root.children) {
      const found = findNodeById(child, id, currentPath)
      if (found) return found
    }
  }
  return null
}

export function getLeafIds(root: ModuleNode): string[] {
  const ids: string[] = []
  function walk(node: ModuleNode) {
    if (node.type && !node.children?.length) ids.push(node.id)
    node.children?.forEach(walk)
  }
  walk(root)
  return ids
}

export function getLeafIdsUnder(node: ModuleNode): string[] {
  const ids: string[] = []
  function walk(n: ModuleNode) {
    if (n.type && !n.children?.length) ids.push(n.id)
    n.children?.forEach(walk)
  }
  walk(node)
  return ids
}
