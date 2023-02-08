import { alpha, createTheme } from '@mui/material'
import { Shadows } from '@mui/material/styles/shadows'
import { brown, caramel, faluRed, ink, parchment } from '@/design/palette'

const disabledBrown = alpha(brown, 0.1)

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0097A6',
      dark: '#006F86',
    },
    secondary: {
      main: brown,
    },
    success: {
      main: '#68B672',
    },
    info: {
      main: '#3AAED8',
    },
    warning: {
      main: caramel,
    },
    error: {
      main: faluRed,
    },
    divider: parchment,
    grey: {
      A100: '#F3F4F6',
      A200: '#B9BECA',
      A400: '#7D869C',
      A700: '#464D5D',
    },
    text: {
      primary: ink,
      secondary: brown,
      disabled: disabledBrown,
    },
    action: {
      disabled: disabledBrown,
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
  shadows: [
    'none',
    ...Array(24)
      .fill(0)
      .map(() => `2px 2px 16px 4px ${alpha(brown, 0.1)}`),
  ] as Shadows,
  components: {
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          transition: theme.transitions.create([
            'textDecorationColor',
            'color',
          ]),
          color: theme.palette.text.secondary,
          textDecorationColor: 'inherit',
          textDecorationThickness: '1px',
          // textDecorationColor: 'inherit',
          '&:hover': {
            color: theme.palette.primary.main,
          },
        }),
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        sizeLarge: ({ theme }) => ({
          padding: theme.spacing(2),
        }),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          transition: theme.transitions.create(['opacity', 'color']),
          '&:hover': {
            color: theme.palette.primary.main,
            background: 'inherit',
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
    MuiSkeleton: {
      defaultProps: {
        animation: false,
      },
    },
  },
})
