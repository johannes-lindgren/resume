'use client'

import React, { ComponentProps, FunctionComponent } from 'react'
import { PDFViewer } from '@react-pdf/renderer'
import { styled } from '@mui/material'
import { a4AspectRatio, a4AspectRatioInv } from '@/components/dom/A4AspectRatio'

export const PdfDocument: FunctionComponent<
  ComponentProps<typeof PDFViewer>
> = (props) => <PDFViewer {...props} />

export const PdfRoot = styled(PdfDocument)({
  aspectRatio: `${a4AspectRatioInv} / 1`,
  border: 'none',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
})
