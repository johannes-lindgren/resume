import { FunctionComponent, ReactElement, useEffect, useRef } from 'react'
import ReactPDF, { usePDF } from '@react-pdf/renderer'
import { Box, styled } from '@mui/material'
import { DownloadRounded, ErrorOutlineRounded } from '@mui/icons-material'
import LoadingButton from '@mui/lab/LoadingButton'

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
}))

export const DownloadPdfButton: FunctionComponent<{
  document: ReactElement<ReactPDF.DocumentProps>
}> = (props) => {
  const { document } = props
  const [instance, updateInstance] = usePDF({
    document: document,
  })

  // useEffect(() => console.log('updateInstance'), [updateInstance])
  // useEffect(() => console.log('document'), [props.document])
  const lastDoc = useRef(document)
  useEffect(() => {
    if (document !== lastDoc.current) {
      lastDoc.current = document
      console.log('updating')
      // updateInstance is not memoized by usePDF :(
      updateInstance()
    }
  }, [updateInstance])

  return (
    <HeaderContainer>
      <LoadingButton
        variant="contained"
        component="a"
        href={instance.url ?? undefined}
        download="resume.pdf"
        startIcon={
          instance.error ? <ErrorOutlineRounded /> : <DownloadRounded />
        }
        loadingPosition="start"
        disabled={!instance.url}
        loading={instance.loading}
      >
        Download PDF
      </LoadingButton>
    </HeaderContainer>
  )
}
