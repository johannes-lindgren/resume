import { FunctionComponent } from 'react'
import { ResumeTarget } from '@/resume-view/ResumeTargetProvider'
import { Setter } from '@/utils/Setter'
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material'
import { PictureAsPdf, WebAsset } from '@mui/icons-material'

export const PreviewTargetSwitch: FunctionComponent<{
  previewTarget: ResumeTarget
  setPreviewTarget: Setter<ResumeTarget>
}> = (props) => {
  const handleChangePreviewMode = (
    event: MouseEvent<HTMLElement>,
    newPreviewTarget: 'pdf' | 'dom' | undefined,
  ) => props.setPreviewTarget(() => newPreviewTarget ?? 'dom')

  return (
    <ToggleButtonGroup
      value={props.previewTarget}
      exclusive
      onChange={handleChangePreviewMode}
      aria-label="preview mode"
      size="small"
      color="primary"
    >
      <ToggleButton
        value="dom"
        aria-label="preview web"
      >
        <Tooltip title="Preview Web Page">
          <WebAsset />
        </Tooltip>
      </ToggleButton>
      <ToggleButton
        value="pdf"
        aria-label="preview pdf"
      >
        <Tooltip title="Preview PDF">
          <PictureAsPdf />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
