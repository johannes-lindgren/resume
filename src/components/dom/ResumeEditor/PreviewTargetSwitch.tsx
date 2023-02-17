import { FunctionComponent } from 'react'
import { ResumeTarget } from '@/resume-view/ResumeTargetProvider'
import { Setter } from '@/utils/Setter'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { PictureAsPdf, WebAsset } from '@mui/icons-material'

export const PreviewTargetSwitch: FunctionComponent<{
  previewTarget: ResumeTarget
  setPreviewTarget: Setter<ResumeTarget>
}> = (props) => {
  const handleChangePreviewMode = (
    event: React.MouseEvent<HTMLElement>,
    newPreviewTarget: 'pdf' | 'dom',
  ) => props.setPreviewTarget(() => newPreviewTarget)

  return (
    <ToggleButtonGroup
      value={props.previewTarget}
      exclusive
      onChange={handleChangePreviewMode}
      aria-label="preview mode"
      size="small"
      sx={{ bgcolor: 'background.paper' }}
    >
      <ToggleButton
        value="dom"
        aria-label="preview web"
      >
        <WebAsset />
      </ToggleButton>
      <ToggleButton
        value="pdf"
        aria-label="preview pdf"
      >
        <PictureAsPdf />
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
