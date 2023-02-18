import { FunctionComponent } from 'react'
import { AllResumeActions } from '@/hooks/useThrottledState'
import { Box, Button, Container, Grow, Stack, Typography } from '@mui/material'
import { Embossed } from '@/components/dom/ResumeEditor/Embossed'
import { NoteAddRounded, TagFacesOutlined } from '@mui/icons-material'
import { resumeTemplate } from '@/model/defaults'
import { UploadResumeButton } from '@/components/dom/UploadResumeButton'
import { MockResume } from '@/components/dom/ResumeEditor/MockResume'
import { ResumeAppFooter } from '@/components/dom/ResumeEditor/ResumeAppFooter'
import { parchment } from '@/design/palette'
import { AnimatedBox } from '@/components/dom/ResumeEditor/AnimatedBox'

export const LandingPage: FunctionComponent<
  Pick<AllResumeActions, 'newResume'>
> = ({ newResume }) => {
  return (
    <Box>
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
        <Hero newResume={newResume} />
        <ResumeAppFooter />
      </Stack>
    </Box>
  )
}

const Hero: FunctionComponent<Pick<AllResumeActions, 'newResume'>> = ({
  newResume,
}) => {
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
            pt: 10,
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
            <Stack gap={2}>
              <Typography>
                Write a simple – yet illuminating – resume that recruiters and
                hiring managers love to read.
              </Typography>
              <Typography
                display="inline-flex"
                alignItems="center"
              >
                Oh, and it&apos;s free
                <TagFacesOutlined
                  fontSize="inherit"
                  sx={{ mx: 1 }}
                />
              </Typography>
            </Stack>
            <Box
              display="flex"
              gap={2}
            >
              <Button
                // size="large"
                variant="contained"
                startIcon={<NoteAddRounded />}
                onClick={() => newResume(resumeTemplate())}
              >
                Create your resume
              </Button>
              <UploadResumeButton
                // size="large"
                variant="outlined"
                color="secondary"
                onChange={newResume}
              />
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
            <Box>
              <MockResume />
            </Box>
          </Grow>
        </Box>
      </Box>
    </Box>
  )
}

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