import React, { FunctionComponent } from 'react'
import { Resume } from '@/model/resume'
import { Stack } from '@/resume-view/base-components'
import { defaultTheme } from '@/resume-view/Theme'
import { Link, Text } from '@/resume-view/primitives'

export const ContactDetailsView: FunctionComponent<{
  resume: Resume
}> = (props) => {
  const {
    resume: { emailAddress, phoneNumber, location },
  } = props
  return (
    <Stack
      style={defaultTheme.typography.caption}
      wrap={false}
    >
      {emailAddress && (
        <Link src={`mailto:${emailAddress}`}>
          <Text style={defaultTheme.typography.link}>{emailAddress}</Text>
        </Link>
      )}
      {phoneNumber && <Text>{phoneNumber}</Text>}
      {location && <Text>{location}</Text>}
    </Stack>
  )
}
