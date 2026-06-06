import { ReactElement, useEffect, useRef } from 'react'
import { usePDF, DocumentProps } from '@react-pdf/renderer'

export const useDownloadablePdf = (document: ReactElement<DocumentProps>) => {
  const [instance] = usePDF({
    document: document,
  })
  //
  // const lastDoc = useRef(document)
  // useEffect(() => {
  //   if (document !== lastDoc.current) {
  //     lastDoc.current = document
  //     // updateInstance is not memoized by usePDF :(
  //     updateInstance(document)
  //   }
  // }, [document, updateInstance])

  return instance
}
