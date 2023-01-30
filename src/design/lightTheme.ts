import { createTheme } from '@mui/material'

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0097A6',
      dark: '#006F86',
    },
    secondary: {
      main: '#6C6355',
    },
    success: {
      main: '#52AA5E',
    },
    error: {
      main: '#C7434E',
    },
    info: {
      main: '#3AAED8',
    },
    divider: '#EDEBE8',
    grey: {
      A100: '#F3F4F6',
      A200: '#B9BECA',
      A400: '#7D869C',
      A700: '#464D5D',
    },
    text: {
      primary: '#2E2A24',
      secondary: '#6C6355',
      disabled: '#6C6355',
    },
  },
  typography: {
    h1: {
      fontSize: '1.75rem',
    },
    h2: {
      fontSize: '1.5rem',
    },
    h3: {
      fontSize: '1.25rem',
    },
    h4: {
      fontSize: '1.125rem',
    },
    h5: {
      fontSize: '1rem',
    },
    h6: {
      fontSize: '0.8rem',
    },
    button: {
      textTransform: 'initial',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&:hover': {
            color: theme.palette.primary.main,
            background: 'none',
          },
        }),
      },
    },
    MuiInput: {
      defaultProps: {
        disableUnderline: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
    MuiFilledInput: {
      defaultProps: {
        disableUnderline: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.grey.A100,
        }),
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius * 2,
          overflow: 'hidden',
        }),
      },
    },
  },
})
