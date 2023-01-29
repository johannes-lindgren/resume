import React, { FunctionComponent } from 'react'
import { Resume } from '@/model/resume'
import { Stack } from '@/components/pdf/Stack'
import { StyleSheet, Text, Link } from '@react-pdf/renderer'
import { theme } from '@/design/Theme'

export const ContactDetailsView: FunctionComponent<{
  resume: Resume
}> = (props) => (
  <Stack
    style={theme.typography.caption}
    wrap={false}
  >
    {/*<Text style={{...theme.typography.header2}}>Contact Details</Text>*/}
    <Link src={`mailto:${props.resume.emailAddress}`}>
      <Text style={theme.typography.link}>{props.resume.emailAddress}</Text>
    </Link>
    <Text>{props.resume.phoneNumber}</Text>
    <Text>{props.resume.location}</Text>
  </Stack>
)
