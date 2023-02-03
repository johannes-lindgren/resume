import { replaced } from '@/utils/replaced'
import { Setter, Setter2 } from '@/utils/Setter'

export const arraySetter =
  <
    Key extends string,
    Child extends { uid: string },
    Parent extends Record<Key, Child[]>,
  >(
    parent: Parent,
    setParent: Setter<Parent>,
    key: Key,
  ): Setter<Child> =>
  (newChild: Child) =>
    setParent({
      ...parent,
      [key]: replaced(parent[key], (it) => it.uid === newChild.uid, newChild),
    })

export const arraySetter2 =
  <
    Key extends string,
    Child extends { uid: string },
    Parent extends Record<Key, Child[]>,
  >(
    childUid: string,
    setParent: Setter2<Parent>,
    key: Key,
  ): Setter2<Child> =>
  (getNewChild) =>
    setParent((parent) => {
      const oldChild = parent[key].find((child) => child.uid === childUid)
      if (!oldChild) {
        return parent
      }
      const newChild = getNewChild(oldChild)
      return {
        ...parent,
        [key]: replaced(parent[key], (it) => it.uid === newChild.uid, newChild),
      }
    })
