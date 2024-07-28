import { createTheme } from '@mui/material'

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#4caf50',
      main: '#087f23',
      dark: '#004d00',
    },
    background: {
      default: '#fafafa',
    },
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#4caf50',
      main: '#087f23',
      dark: '#004d00',
    },
    background: {
      default: '#424242',
    },
  },
})
