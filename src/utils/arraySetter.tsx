import { replaced } from '@/utils/replaced'
import { Setter } from '@/utils/Setter'

export const arraySetter =
  <
    Key extends string,
    Child extends { uid: string },
    Parent extends { [k in Key]: Child[] },
  >(
    parent: Parent,
    setParent: Setter<Parent>,
    key: Key,
  ) =>
  (newChild: Child) =>
    setParent({
      ...parent,
      [key]: replaced(parent[key], (it) => it.uid === newChild.uid, newChild),
    })
