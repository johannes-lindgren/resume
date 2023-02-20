import { ResumeEditor } from '@/components/dom/ResumeEditor'
import { NextPage } from 'next'
import { ResumeAppProps } from '@/pages/index'
import { useRouter } from 'next/router'

export const EditorPage: NextPage<ResumeAppProps> = (props) => {
  const { state, actions } = props
  const { push } = useRouter()

  switch (state.type) {
    case 'loading':
      return <></>
    case 'uninitialized':
      void push('/')
      return <></>
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

export default EditorPage
