import { FunctionComponent, useCallback } from 'react'
import { Setter2 } from '@/utils/Setter'
import { Box, BoxProps, IconButton, styled } from '@mui/material'
import { SelectFileButton } from '@/components/dom/SelectFileButton'
import { AddAPhotoRounded, DeleteOutlineRounded } from '@mui/icons-material'

const Root = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100px',
  height: '100px',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.secondary.main,
  border: `1px solid ${theme.palette.divider}`,
  '& .visibleOnHover': {
    opacity: 0,
    transition: theme.transitions.create('opacity'),
  },
  '&:hover .visibleOnHover': {
    opacity: 1,
  },
}))

const HoverIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  margin: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.secondary.main,
  backgroundColor: theme.palette.background.paper,
}))

export const ImageForm: FunctionComponent<
  {
    image: string | undefined
    setImage: Setter2<string | undefined>
  } & BoxProps<'img'>
> = (props) => {
  const { image, setImage } = props
  const handleFile = useCallback(
    (file: File) => {
      const reader = new FileReader()
      reader.onloadend = ({ target }) => {
        if (typeof target?.result !== 'string') {
          //   TODO show error message popup
          console.error('Failed to load the image')
          return
        }
        const { result } = target
        setImage(() => result)
      }
      reader.readAsDataURL(file)
    },
    [setImage],
  )

  return (
    <Root>
      <SelectFileButton
        accept="image/*"
        onChange={handleFile}
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        {image ? (
          <Box
            component="img"
            src={image}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            {...props}
          />
        ) : (
          <AddAPhotoRounded />
        )}
      </SelectFileButton>
      <HoverIconButton
        className="visibleOnHover"
        disableRipple
        size="small"
        onClick={(e) => {
          e.preventDefault()
          props.setImage(() => undefined)
        }}
        sx={{
          display: image ? 'flex' : 'none',
        }}
      >
        <DeleteOutlineRounded
          color="inherit"
          fontSize="inherit"
        />
      </HoverIconButton>
    </Root>
  )
}
