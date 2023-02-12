import React, { FunctionComponent } from 'react'
import { Resume } from '@/model/resume'
import { defaultTheme } from '@/resume-view/Theme'
import { ContactDetailsView } from '@/resume-view/templates/default/ContactDetailsView'
import { createStyles } from '@/resume-view/primitives/Styles'
import { View } from '@/resume-view/primitives/View'
import { Image } from '@/resume-view/primitives/Image'
import { Text } from '@/resume-view/primitives/Text'

const styles = createStyles({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    backgroundColor: '#1E90FF',
    width: defaultTheme.spacing(5),
    height: defaultTheme.spacing(5),
    borderRadius: defaultTheme.spacing(1),
    marginRight: defaultTheme.spacing(3),
  },
  textSection: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  name: {
    ...defaultTheme.typography.header1,
    marginBottom: defaultTheme.spacing(1),
  },
  title: {
    ...defaultTheme.typography.body,
  },
})

export const Header: FunctionComponent<{
  resume: Resume
}> = (props) => (
  <View style={styles.root}>
    {props.resume.image && (
      <Image
        src={props.resume.image}
        style={styles.image}
      />
    )}
    <View style={styles.textSection}>
      <Text style={styles.name}>{props.resume.name}</Text>
      <Text style={styles.title}>{props.resume.jobTitle}</Text>
    </View>
    <ContactDetailsView resume={props.resume} />
  </View>
)
