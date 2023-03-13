import { NextPage } from 'next'
import { FunctionComponent } from 'react'
import { AppActions, AppState } from '@/hooks/useThrottledState'
import {
  Box,
  Button,
  Container,
  Grow,
  Stack,
  styled,
  Typography,
} from '@mui/material'
import { Embossed } from '@/components/dom/Embossed'
import { NavigateNext, NoteAddRounded } from '@mui/icons-material'
import { resumeTemplate } from '@/model/defaults'
import { UploadResumeButton } from '@/components/dom/UploadResumeButton'
import { MockResume } from '@/components/dom/MockResume'
import { ResumeAppFooter } from '@/components/dom/ResumeAppFooter'
import { parchment } from '@/design/palette'
import { AnimatedBox } from '@/components/dom/AnimatedBox'
import { useRouter } from 'next/router'
import { Resume } from '@/model/resume'
import { DomResume } from '@/resume-view/DomResume'
import { DefaultTemplate } from '@/resume-view/templates/default/DefaultTemplate'

export const LandingPage: FunctionComponent<
  Pick<AppActions, 'newResume'> & {
    resume: Resume | undefined
  }
> = (props) => {
  const { newResume, resume } = props
  return (
    <Stack
      gap={6}
      justifyContent="space-between"
      sx={{
        minHeight: '100vh',
        pb: 5,
        maxWidth: 'xs',
        typography: 'h1',
      }}
    >
      <Hero
        newResume={newResume}
        resume={resume}
      />
      <ResumeAppFooter />
    </Stack>
  )
}

const Hero: FunctionComponent<
  Pick<AppActions, 'newResume'> & {
    resume: Resume | undefined
  }
> = (props) => {
  const { newResume, resume } = props
  const { push } = useRouter()
  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Background />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 4,
          px: 2,
        }}
      >
        <Stack
          gap={5}
          sx={{
            pt: {
              xs: 10,
              md: 20,
            },
            pb: 20,
          }}
        >
          <Typography
            component="h1"
            textAlign="center"
            sx={{
              color: 'secondary.main',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Embossed
              fontSize="2rem"
              component="span"
              sx={{ ml: -10, transform: 'skew(0deg, -5deg)' }}
            >
              Create Your
            </Embossed>
            <Embossed
              component="span"
              fontSize="5rem"
              sx={{ transform: 'skew(0deg, -5deg)' }}
            >
              Splendind Résumé
            </Embossed>
          </Typography>
          <Container
            maxWidth="xs"
            sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
          >
            <Stack gap={4}>
              <Typography>
                Write a simple – yet illuminating – resume that recruiters and
                hiring managers love to read.
              </Typography>
            </Stack>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: {
                  xs: 'center',
                  md: 'flex-start',
                },
              }}
            >
              {resume ? (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component="a"
                  href="/editor"
                  disableElevation={false}
                  endIcon={<NavigateNext />}
                >
                  Continue editing
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<NoteAddRounded />}
                    onClick={() => {
                      newResume(resumeTemplate())
                      void push('/editor')
                    }}
                  >
                    Create your resume
                  </Button>
                  <UploadResumeButton
                    variant="outlined"
                    color="secondary"
                    onChange={(r) => {
                      newResume(r)
                      void push('/editor')
                    }}
                  />
                </>
              )}
            </Box>
          </Container>
        </Stack>
        <Box
          sx={{
            position: 'relative',
            alignSelf: 'flex-end',
            display: {
              xs: 'none',
              sm: 'none',
              md: 'initial',
            },
          }}
        >
          <Grow
            in
            timeout={2000}
          >
            <A4Paper>
              {resume ? <PreviewResume resume={resume} /> : <MockResume />}
            </A4Paper>
          </Grow>
        </Box>
      </Box>
    </Box>
  )
}

const PreviewResume: FunctionComponent<{
  resume: Resume
}> = ({ resume }) => (
  <DomResume
    sx={{
      position: 'relative',
      height: '100%',
    }}
  >
    <DefaultTemplate resume={resume} />
  </DomResume>
)

const A4Paper = styled(Box)(({ theme }) => ({
  width: 300,
  height: 400,
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  boxShadow: theme.shadows[12],
  backgroundColor: theme.palette.background.paper,
}))

const Background: FunctionComponent = () => {
  return (
    <AnimatedBox
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: parchment,
        transform: `skew(0deg, -3deg) translate(0px, -100px)`,
        zIndex: -1,
      }}
    />
  )
}

export type ResumeAppProps = {
  state: AppState
  actions: AppActions
}

export const IndexPage: NextPage<ResumeAppProps> = (props) => {
  const { state, actions } = props
  return (
    <LandingPage
      newResume={actions.newResume}
      resume={state.resume}
    />
  )
}

export default IndexPage
