import React, { FunctionComponent } from 'react'
import { Resume } from '@/model/resume'
import { Stack } from '@/components/pdf/Stack'
import { defaultTheme } from '@/resume-view/Theme'
import { Link } from '@/resume-view/primitives/Link'
import { Text } from '@/resume-view/primitives/Text'

export const ContactDetailsView: FunctionComponent<{
  resume: Resume
}> = (props) => (
  <Stack
    style={defaultTheme.typography.caption}
    wrap={false}
  >
    {/*<Text style={{...theme.typography.header2}}>Contact Details</Text>*/}
    <Link src={`mailto:${props.resume.emailAddress}`}>
      <Text style={defaultTheme.typography.link}>
        {props.resume.emailAddress}
      </Text>
    </Link>
    <Text>{props.resume.phoneNumber}</Text>
    <Text>{props.resume.location}</Text>
  </Stack>
)
