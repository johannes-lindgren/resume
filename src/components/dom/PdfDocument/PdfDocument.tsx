'use client'

import React, { ComponentProps, FunctionComponent } from 'react'
import { Font } from '@react-pdf/renderer'
import { PDFViewer } from '@react-pdf/renderer'
import cssStyles from './styles.module.scss'

export const PdfDocument: FunctionComponent<
  ComponentProps<typeof PDFViewer>
> = (props) => (
  <PDFViewer
    className={cssStyles.class}
    {...props}
  />
)
