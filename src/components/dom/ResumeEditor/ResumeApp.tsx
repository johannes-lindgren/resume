import { useResumeApp } from '@/hooks/useThrottledState'
import { ResumeEditor } from '@/components/dom/ResumeEditor/ResumeEditor'
import { LandingPage } from '@/components/dom/ResumeEditor/LandingPage'

// splendidresume.com

export const ResumeApp = () => {
  const [state, actions] = useResumeApp(1500)

  switch (state.type) {
    case 'loading':
      return <></>
    case 'uninitialized':
      return <LandingPage newResume={actions.newResume} />
    default:
      return (
        <ResumeEditor
          resume={state.resume}
          setResume={actions.setResume}
          removeResume={actions.removeResume}
          saved={state.type === 'saved'}
          newResume={actions.newResume}
        />
      )
  }
}
