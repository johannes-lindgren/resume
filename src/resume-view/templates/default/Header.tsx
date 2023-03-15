import React, { FunctionComponent } from 'react'
import { Resume } from '@/model/resume'
import { defaultTheme } from '@/resume-view/Theme'
import { ContactDetailsView } from '@/resume-view/templates/default/ContactDetailsView'
import { createStyles, View, Image, Text } from '@/resume-view/primitives'

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
    yoyo: 'dummy',
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
}> = (props) => {
  const {
    resume: { name, jobTitle, image },
  } = props
  return (
    <View style={styles.root}>
      {image && (
        <Image
          src={image}
          style={styles.image}
        />
      )}
      <View style={styles.textSection}>
        {name && <Text style={styles.name}>{name}</Text>}
        {jobTitle && <Text style={styles.title}>{jobTitle}</Text>}
      </View>
      <ContactDetailsView resume={props.resume} />
    </View>
  )
}
