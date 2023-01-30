import { FunctionComponent } from 'react'
import { Button, ButtonProps } from '@mui/material'
import { DownloadRounded } from '@mui/icons-material'
import { Resume } from '@/model/resume'

export const DownloadResumeButton: FunctionComponent<
  {
    resume: Resume
    suggestedName: string
  } & ButtonProps
> = (props) => {
  const { resume, suggestedName, ...buttonProps } = props
  const handleClick = async () => {
    const json = JSON.stringify(resume)
    const blob = new Blob([json], {
      type: 'text/json;charset=utf-8',
    })
    const blobUrl = URL.createObjectURL(blob)

    const anchor = document.createElement('a')
    anchor.href = blobUrl
    anchor.target = '_blank'
    anchor.download = `${suggestedName}.cv`
    // Auto click on a element, trigger the file download
    anchor.click()

    // This is required (and important)
    URL.revokeObjectURL(blobUrl)
  }

  return (
    <Button
      startIcon={<DownloadRounded />}
      onClick={handleClick}
      {...buttonProps}
    >
      Save file
    </Button>
  )
}
