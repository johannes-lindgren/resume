import React, { FunctionComponent } from 'react'
import { Document, Page, StyleSheet } from '@react-pdf/renderer'
import { Resume } from '@/model/resume'
import { Header } from '@/components/pdf/Resume/Header'
import { theme } from '@/design/Theme'
import { SectionView } from '@/components/pdf/Resume/SectionView'
import { Stack } from '@/components/pdf/Stack'
import { PageCount } from '@/components/pdf/Resume/PageCount'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: theme.palette.background,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: '15vw',
    paddingRight: '15vw',
    ...theme.typography.body,
  },
})

export const ResumeView: FunctionComponent<{
  resume: Resume
}> = (props) => (
  <Document>
    <Page
      size="A4"
      style={styles.page}
    >
      <Stack gap={4}>
        <Header resume={props.resume} />
        {props.resume.sections.map((section, index) => (
          <SectionView
            key={index}
            section={section}
          />
        ))}
      </Stack>
      <PageCount />
    </Page>
  </Document>
)
