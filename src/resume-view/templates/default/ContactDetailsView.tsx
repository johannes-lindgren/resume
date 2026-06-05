import React, { FunctionComponent } from 'react'
import { Resume } from '@/model/resume'
import { defaultTheme } from '@/resume-view/Theme'
import { Link, Text, View } from '@/resume-view/primitives'

export const ContactDetailsView: FunctionComponent<{
  resume: Resume
}> = ({ resume: { emailAddress, phoneNumber, location } }) => (
  <View
    style={{
      ...defaultTheme.typography.caption,
      flexDirection: 'column',
    }}
    wrap={false}
  >
    {emailAddress && (
      <Link src={`mailto:${emailAddress}`}>
        <Text style={defaultTheme.typography.link}>{emailAddress}</Text>
      </Link>
    )}
    {phoneNumber && <Text>{phoneNumber}</Text>}
    {location && <Text>{location}</Text>}
  </View>
)
