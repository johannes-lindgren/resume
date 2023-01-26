import { Style } from '@react-pdf/types'

export type JoinStyles = (
  style1: Style | Style[] | undefined,
  style2: Style | Style[] | undefined,
) => Style | Style[] | undefined
export const joinStyles: JoinStyles = (style1, style2) => {
  if (typeof style1 === 'undefined') {
    return style2
  }
  if (typeof style2 === 'undefined') {
    return style1
  }
  const styles1 = Array.isArray(style1) ? style1 : [style1]
  const styles2 = Array.isArray(style2) ? style2 : [style2]
  return [...styles1, ...styles2]
}
