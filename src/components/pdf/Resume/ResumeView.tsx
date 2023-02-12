import React, { FunctionComponent } from 'react'
import { Document, Page, StyleSheet } from '@react-pdf/renderer'
import { Resume } from '@/model/resume'
import { Header } from '@/components/pdf/Resume/Header'
import { defaultTheme } from '@/resume-view/Theme'
import { SectionView } from '@/components/pdf/Resume/SectionView'
import { Stack } from '@/components/pdf/Stack'
import { PageCount } from '@/components/pdf/Resume/PageCount'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: defaultTheme.palette.background,
    paddingTop: '7vh',
    paddingBottom: '7vh',
    paddingLeft: '15vw',
    paddingRight: '15vw',
    ...defaultTheme.typography.body,
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
