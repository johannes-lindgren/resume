import React, { FunctionComponent } from 'react'
import { Resume } from '@/model/resume'
import { Image, StyleSheet, Text, View } from '@react-pdf/renderer'
import { defaultTheme } from '@/resume-view/Theme'
import { ContactDetailsView } from '@/components/pdf/Resume/ContactDetailsView'

const styles = StyleSheet.create({
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
