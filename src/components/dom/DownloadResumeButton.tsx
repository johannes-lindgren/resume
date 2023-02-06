import { FunctionComponent } from 'react'
import { Button, ButtonProps } from '@mui/material'
import { DownloadRounded } from '@mui/icons-material'
import { Resume } from '@/model/resume'

export const useSaveObject = (obj: unknown, suggestedName: string) => {
  const handleClick = () => {
    const json = JSON.stringify(obj)
    const blob = new Blob([json], {
      type: 'text/json;charset=utf-8',
    })
    const blobUrl = URL.createObjectURL(blob)

    const anchor = document.createElement('a')
    anchor.href = blobUrl
    anchor.target = '_blank'
    anchor.download = suggestedName
    // Auto click on a element, trigger the file download
    anchor.click()

    // This is required (and important)
    URL.revokeObjectURL(blobUrl)
  }
  return handleClick
}

export const DownloadResumeButton: FunctionComponent<
  {
    resume: Resume
    suggestedName: string
  } & ButtonProps
> = (props) => {
  const { resume, suggestedName, ...buttonProps } = props

  const download = useSaveObject(resume, `${suggestedName}.cv`)

  return (
    <Button
      startIcon={<DownloadRounded />}
      onClick={download}
      {...buttonProps}
    >
      Save file
    </Button>
  )
}
