import {Dispatch, FunctionComponent, SetStateAction, useState} from "react";
import {A4} from "@/components/dom/A4";
// import {PdfDocument} from "@/components/dom/PdfDocument";
import {ResumeView} from "@/components/pdf/Resume";
import {Resume} from "@/model/resume";
import {Font} from "@react-pdf/renderer";
import {theme} from "@/design/Theme";
import {useThrottle} from "@/hooks/useThrottle";
import dynamic from "next/dynamic";
import {TextField} from "@mui/material";
import {johannesResume} from "@/tmp/johannesResume";

// Register font
Font.register({family: 'Roboto', src: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap'});

const DownloadResumeButton = dynamic(() => import('../DownloadResumeButton').then(module => module.DownloadResumeButton), {
  ssr: false
})
const PdfDocument = dynamic(() => import('../PdfDocument/PdfDocument').then(module => module.PdfDocument), {
  ssr: false
})

export const ResumeEditor: FunctionComponent = () => {
  const [resume, setResume] = useState<Resume>(johannesResume)
  const throttledResume = useThrottle(resume, 500)

  return (
    <div style={{
      display: 'flex',
      ...theme.typography.body,
    }}>
      <ResumeInput resume={resume} setResume={setResume}/>
      <A4>
        <DownloadResumeButton resume={resume} />
        <PdfDocument showToolbar={false} width="100%">
          <ResumeView resume={throttledResume}/>
        </PdfDocument>
      </A4>
    </div>
  )
}

const ResumeInput: FunctionComponent<{
  resume: Resume
  setResume: Dispatch<SetStateAction<Resume>>
}> = (props) => (
  <div style={{
    padding: theme.spacing(2),
  }}>
    <TextField placeholder="Email Address" value={props.resume.emailAddress}
               onChange={({target}) => props.setResume(oldResume => ({
                 ...oldResume,
                 emailAddress: target.value,
               }))}/>
  </div>
)