import { FunctionComponent, ReactElement, useEffect } from 'react'
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
  const [instance, updateInstance] = usePDF({
    document: props.document,
  })

  useEffect(() => {
    updateInstance()
  }, [props.document, updateInstance])

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
