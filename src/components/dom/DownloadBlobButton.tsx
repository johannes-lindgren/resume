import { FunctionComponent } from 'react'
import { Button } from '@mui/material'
import { SaveRounded } from '@mui/icons-material'

export const DownloadBlobButton: FunctionComponent<{
  obj: unknown
  suggestedName: string
}> = (props) => {
  const handleClick = async () => {
    const json = JSON.stringify(props.obj)
    const blob = new Blob([json], {
      type: 'text/json;charset=utf-8',
    })
    const blobUrl = URL.createObjectURL(blob)

    const anchor = document.createElement('a')
    anchor.href = blobUrl
    anchor.target = '_blank'
    anchor.download = props.suggestedName
    // Auto click on a element, trigger the file download
    anchor.click()

    // This is required (and important)
    URL.revokeObjectURL(blobUrl)
  }

  return (
    <Button
      startIcon={<SaveRounded />}
      color="inherit"
      variant="outlined"
      onClick={handleClick}
    >
      Save to file system
    </Button>
  )
}
