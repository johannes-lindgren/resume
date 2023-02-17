import React, { FunctionComponent } from 'react'
import { Resume } from '@/model/resume'
import { Stack } from '@/resume-view/base-components'
import { defaultTheme } from '@/resume-view/Theme'
import { Link, Text } from '@/resume-view/primitives'

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
