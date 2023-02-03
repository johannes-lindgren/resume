import { FunctionComponent } from 'react'
import { Resume } from '@/model/resume'
import { Setter2 } from '@/utils/Setter'
import { Button, Grid } from '@mui/material'
import {
  Assessment,
  HistoryEduRounded,
  SchoolOutlined,
  WorkHistory,
} from '@mui/icons-material'
import {
  newEducationHistorySection,
  newSkillsSection,
  newSummarySection,
} from '@/model/defaults'

export const AddSectionsPanel: FunctionComponent<{
  resume: Resume
  setResume: Setter2<Resume>
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
        startIcon={<WorkHistory />}
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
        startIcon={<Assessment />}
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
