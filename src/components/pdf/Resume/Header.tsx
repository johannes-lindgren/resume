import React, { FunctionComponent } from 'react'
import { Resume } from '@/model/resume'
import { Image, StyleSheet, Text, View } from '@react-pdf/renderer'
import { theme } from '@/design/Theme'
import { ContactDetailsView } from '@/components/pdf/Resume/ContactDetailsView'

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    backgroundColor: '#1E90FF',
    width: theme.spacing(5),
    height: theme.spacing(5),
    borderRadius: theme.spacing(1),
    marginRight: theme.spacing(3),
  },
  textSection: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  name: {
    ...theme.typography.header1,
    marginBottom: theme.spacing(1),
  },
  title: {
    ...theme.typography.body,
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
