import { FunctionComponent } from 'react'
import { Resume } from '@/model/resume'
import { Setter } from '@/utils/Setter'
import { Button, Grid } from '@mui/material'
import {
  AssessmentOutlined,
  HistoryEduRounded,
  SchoolOutlined,
  WorkHistoryOutlined,
} from '@mui/icons-material'
import {
  newEducationHistorySection,
  newSkillsSection,
  newSummarySection,
} from '@/model/defaults'

export const AddSectionsPanel: FunctionComponent<{
  setResume: Setter<Resume>
}> = (props) => (
  <Grid
    container
    spacing={2}
    columns={2}
  >
    <Grid
      item
      xs={1}
    >
      <Button
        startIcon={<WorkHistoryOutlined />}
        onClick={() =>
          props.setResume((resume) => ({
            ...resume,
            sections: [...resume.sections, newEducationHistorySection()],
          }))
        }
      >
        Add Employments
      </Button>
    </Grid>
    <Grid
      item
      xs={1}
    >
      <Button
        startIcon={<SchoolOutlined />}
        onClick={() =>
          props.setResume((resume) => ({
            ...resume,
            sections: [...resume.sections, newEducationHistorySection()],
          }))
        }
      >
        Add Educations
      </Button>
    </Grid>
    <Grid
      item
      xs={1}
    >
      <Button
        startIcon={<AssessmentOutlined />}
        onClick={() =>
          props.setResume((resume) => ({
            ...resume,
            sections: [...resume.sections, newSkillsSection()],
          }))
        }
      >
        Add Skills
      </Button>
    </Grid>
    <Grid
      item
      xs={1}
    >
      <Button
        startIcon={<HistoryEduRounded />}
        onClick={() =>
          props.setResume((resume) => ({
            ...resume,
            sections: [...resume.sections, newSummarySection()],
          }))
        }
      >
        Add Summary
      </Button>
    </Grid>
  </Grid>
)
