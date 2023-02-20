import { FunctionComponent, ReactElement } from 'react'
import ReactPDF from '@react-pdf/renderer'
import { DownloadRounded, ErrorOutlineRounded } from '@mui/icons-material'
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton'
import { useDownloadablePdf } from '@/components/dom/useDownloadablePdf'

export const DownloadPdfButton: FunctionComponent<
  {
    document: ReactElement<ReactPDF.DocumentProps>
  } & LoadingButtonProps
> = (props) => {
  const { document, ...loadingButtonProps } = props
  const instance = useDownloadablePdf(props.document)

  return (
    <LoadingButton
      component="a"
      href={instance.url ?? undefined}
      download="resume.pdf"
      startIcon={instance.error ? <ErrorOutlineRounded /> : <DownloadRounded />}
      loadingPosition="start"
      disabled={!instance.url}
      loading={instance.loading}
      {...loadingButtonProps}
    />
  )
}
