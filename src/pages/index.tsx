import { NextPage } from 'next'
import { Box } from '@mui/material'
import { ResumeApp } from '@/components/dom/ResumeEditor/ResumeApp'

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
