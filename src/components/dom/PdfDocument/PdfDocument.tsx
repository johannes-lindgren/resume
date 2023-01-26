'use client'

import React, { ComponentProps, FunctionComponent } from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'
import { PDFViewer } from '@react-pdf/renderer'
import cssStyles from './styles.module.scss'

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: `/fonts/Roboto-Light.ttf`,
      fontWeight: 300,
    },
    {
      src: `/fonts/Roboto-Regular.ttf`,
      fontWeight: 400,
    },
    {
      src: `/fonts/Roboto-Medium.ttf`,
      fontWeight: 500,
    },
    {
      src: `/fonts/Roboto-Bold.ttf`,
      fontWeight: 700,
    },
  ],
})

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
})

export const PdfDocument: FunctionComponent<
  ComponentProps<typeof PDFViewer>
> = (props) => (
  <PDFViewer
    className={cssStyles.class}
    {...props}
  />
)
