import {FunctionComponent} from "react";
import {Resume} from "@/model/resume";
import {usePDF} from "@react-pdf/renderer";
import {ResumeView} from "@/components/pdf/Resume";
import {theme} from "@/design/Theme";
import {Button} from "@mui/material";

export const DownloadResumeButton: FunctionComponent<{
  resume: Resume
}> = (props) => {
  const [instance, updateInstance] = usePDF({document: <ResumeView resume={props.resume}/>});

  if (instance.loading) {
    return <div>Loading ...</div>
  }

  if (instance.error) {
    return <div>Something went wrong: {instance.error}</div>
  }

  return (
    <div style={{padding: theme.spacing(2)}}>
      <Button onClick={updateInstance}>Update</Button>
      <Button component="a" href={instance.url ?? undefined} download="resume.pdf">
        Download
      </Button>
    </div>
  );
}