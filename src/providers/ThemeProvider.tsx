import { ThemeProvider as MuiThemeProvider, useMediaQuery } from '@mui/material'

import { darkTheme, lightTheme } from '../styles/theme'

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  return (
    <MuiThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
      {children}
    </MuiThemeProvider>
  )
}
