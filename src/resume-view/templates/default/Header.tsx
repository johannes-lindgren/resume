import React, { FunctionComponent } from 'react'
import { Resume } from '@/model/resume'
import { defaultTheme } from '@/resume-view/Theme'
import { ContactDetailsView } from '@/resume-view/templates/default/ContactDetailsView'
import { createStyles, View, Image, Text } from '@/resume-view/primitives'

const largeImageWidth = '100px'
// 3:4 portrait ratio (width:height)
const largeImageHeight = largeImageWidth.replace(/^(-?\d+\.?\d*)/, (_, n) =>
  String(Math.round((Number(n) * 4) / 3)),
)

const imageSizeMap = {
  small: defaultTheme.spacing(5),
  large: largeImageWidth,
  largeHeight: largeImageHeight,
} as const

const styles = createStyles({
  root: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textSection: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  name: {
    ...defaultTheme.typography.header1,
  },
  nameLarge: {
    ...defaultTheme.typography.header1,
    fontSize: defaultTheme.typography.header1.fontSize
      ?.toString()
      .replace(/^(-?\d+\.?\d*)/, (_, n) => String(Math.round(Number(n) * 1.4))),
  },
  title: {
    ...defaultTheme.typography.body,
  },
})

const SmallHeader: FunctionComponent<{ resume: Resume }> = ({ resume }) => (
  <View style={styles.root}>
    {resume.image && (
      <Image
        src={resume.image}
        style={{
          backgroundColor: '#1E90FF',
          width: imageSizeMap.small,
          height: imageSizeMap.small,
          borderRadius: defaultTheme.spacing(1),
          marginRight: defaultTheme.spacing(3),
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
    )}
    <View style={styles.textSection}>
      {resume.name && <Text style={styles.name}>{resume.name}</Text>}
      {resume.jobTitle && <Text style={styles.title}>{resume.jobTitle}</Text>}
    </View>
    <ContactDetailsView resume={resume} />
  </View>
)

const LargeHeader: FunctionComponent<{ resume: Resume }> = ({ resume }) => (
  <View style={styles.root}>
    {resume.image && (
      <Image
        src={resume.image}
        style={{
          backgroundColor: '#1E90FF',
          width: imageSizeMap.large,
          height: imageSizeMap.largeHeight,
          borderRadius: defaultTheme.spacing(1),
          marginRight: defaultTheme.spacing(3),
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
    )}
    <View style={styles.textSection}>
      {resume.name && <Text style={styles.nameLarge}>{resume.name}</Text>}
      {resume.jobTitle && <Text style={styles.title}>{resume.jobTitle}</Text>}
      <View style={{ marginTop: defaultTheme.spacing(1) }}>
        <ContactDetailsView resume={resume} />
      </View>
    </View>
  </View>
)

export const Header: FunctionComponent<{ resume: Resume }> = ({ resume }) =>
  resume.template?.imageSize === 'large' ? (
    <LargeHeader resume={resume} />
  ) : (
    <SmallHeader resume={resume} />
  )
