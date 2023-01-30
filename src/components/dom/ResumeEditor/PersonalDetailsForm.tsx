import { FunctionComponent, useCallback, useState } from 'react'
import { Resume } from '@/model/resume'
import { Setter } from '@/utils/Setter'
import { Box, BoxProps, IconButton, Stack } from '@mui/material'
import { PropTextEditor } from '@/components/dom/ResumeEditor/PropTextEditor'
import { SelectFileButton } from '@/components/dom/SelectFileButton'
import { AddAPhotoRounded, Delete } from '@mui/icons-material'

export const PersonalDetailsForm: FunctionComponent<{
  resume: Resume
  setResume: Setter<Resume>
}> = (props) => (
  <Stack gap={2}>
    <Box
      display="flex"
      gap={2}
    >
      <Box>
        <ImageForm
          image={props.resume.image}
          setImage={(image) =>
            props.setResume({
              ...props.resume,
              image,
            })
          }
        />
      </Box>
      <Stack>
        <PropTextEditor
          // label="Name"
          placeholder="Full name"
          propName={'name'}
          value={props.resume}
          setValue={props.setResume}
          inputProps={{ sx: { typography: 'h1' } }}
        />
        <PropTextEditor
          // label="Job Title"
          placeholder="Job title"
          propName={'jobTitle'}
          value={props.resume}
          setValue={props.setResume}
          inputProps={{ sx: { typography: 'subtitle1' } }}
        />
      </Stack>
    </Box>
    <PropTextEditor
      variant="filled"
      label="Country"
      propName={'location'}
      value={props.resume}
      setValue={props.setResume}
    />
    <PropTextEditor
      variant="filled"
      label="Nationality"
      propName={'nationality'}
      value={props.resume}
      setValue={props.setResume}
    />
    <PropTextEditor
      variant="filled"
      label="Email Address"
      propName={'emailAddress'}
      value={props.resume}
      setValue={props.setResume}
    />
    <PropTextEditor
      variant="filled"
      label="Phone Number"
      propName={'phoneNumber'}
      value={props.resume}
      setValue={props.setResume}
    />
  </Stack>
)

const ImageForm: FunctionComponent<
  {
    image: string | undefined
    setImage: Setter<string | undefined>
  } & BoxProps<'img'>
> = (props) => {
  const { image, setImage } = props
  const handleFile = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onloadend = (e) => {
      if (typeof e.target?.result !== 'string') {
        //   TODO show error message popup
        console.error('Failed to load the image')
        return
      }
      setImage(e.target.result)
    }
    reader.readAsDataURL(file)
  }, [])

  return (
    <SelectFileButton
      accept="image/*"
      onChange={handleFile}
      sx={{
        width: '100px',
        height: '100px',
        borderRadius: 1,
        overflow: 'hidden',
        bgcolor: 'grey.A100',
        color: 'secondary.main',
      }}
    >
      {image ? (
        <>
          <Box
            component="img"
            src={image}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              overflow: 'hidden',
            }}
            {...props}
          />
          {/* TODO */}
          {/*<IconButton*/}
          {/*  sx={{*/}
          {/*    position: 'absolute',*/}
          {/*    top: 0,*/}
          {/*    right: 0,*/}
          {/*    bgColor: 'background.paper',*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <Delete />*/}
          {/*</IconButton>*/}
        </>
      ) : (
        <AddAPhotoRounded />
      )}
    </SelectFileButton>
  )
}
