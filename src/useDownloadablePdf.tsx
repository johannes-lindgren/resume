import { ReactElement, useEffect, useRef } from 'react'
import ReactPDF, { usePDF } from '@react-pdf/renderer'

export const useDownloadablePdf = (
  document: ReactElement<ReactPDF.DocumentProps>,
) => {
  const [instance, updateInstance] = usePDF({
    document: document,
  })

  const lastDoc = useRef(document)
  useEffect(() => {
    if (document !== lastDoc.current) {
      lastDoc.current = document
      // updateInstance is not memoized by usePDF :(
      updateInstance()
    }
  }, [updateInstance])

  return instance
}
