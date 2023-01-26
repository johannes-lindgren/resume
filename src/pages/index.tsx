import { ResumeEditor } from '@/components/dom/ResumeEditor/ResumeEditor'
import { NextPage } from 'next'
import { Box, Container } from '@mui/material'

const Page: NextPage = () => {
  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
      }}
    >
      <ResumeEditor />
    </Box>
  )
}

export default Page
