import { replaced } from '@/utils/replaced'
import { Setter } from '@/utils/Setter'

export const arraySetter =
  <
    Key extends string,
    Child extends { uid: string },
    Parent extends Record<Key, Child[]>,
  >(
    childUid: string,
    setParent: Setter<Parent>,
    key: Key,
  ): Setter<Child> =>
  (getNewChild) =>
    setParent((parent) => {
      const oldChild = parent[key].find((child) => child.uid === childUid)
      if (!oldChild) {
        // Handle!
        console.warn(
          `Could not find an element under the property "${key}" with the uid "${childUid}"`,
        )
        return parent
      }
      const newChild = getNewChild(oldChild)
      return {
        ...parent,
        [key]: replaced(parent[key], (it) => it.uid === newChild.uid, newChild),
      }
    })
