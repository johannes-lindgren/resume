import {
  FunctionComponent,
  JSXElementConstructor,
  ReactElement,
  useEffect,
} from 'react'
import { Resume } from '@/model/resume'
import ReactPDF, { usePDF } from '@react-pdf/renderer'
import { ResumeView } from '@/components/pdf/Resume'
import { theme } from '@/design/Theme'
import { Alert, Box, Button, CircularProgress, styled } from '@mui/material'
import { DownloadRounded, ErrorOutlineRounded } from '@mui/icons-material'
import LoadingButton from '@mui/lab/LoadingButton'

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
}))

export const DownloadResumeButton: FunctionComponent<{
  document: ReactElement<
    ReactPDF.DocumentProps,
    string | JSXElementConstructor<any>
  >
}> = (props) => {
  const [instance, updateInstance] = usePDF({
    document: props.document,
  })

  useEffect(() => {
    updateInstance()
  }, [props.document])

  return (
    <HeaderContainer>
      <LoadingButton
        variant="text"
        color="inherit"
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
        Download
      </LoadingButton>
    </HeaderContainer>
  )
}
