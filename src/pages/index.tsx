import { ResumeApp } from '@/components/dom/ResumeEditor/ResumeEditor'
import { NextPage } from 'next'
import { Box, Container } from '@mui/material'

const Page: NextPage = () => {
  return (
    <Box
      component="main"
      sx={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
      }}
    >
      <ResumeApp />
    </Box>
  )
}

export default Page
