export const colors = {
  neutral: {
    white: '#ffffff',
    black: '#000000',
    light: '#f5f5f5',
    dark: '#9e9e9e',
  },
  primary: {
    light: '#4caf50',
    main: '#087f23',
    dark: '#004d00',
  },
  seconday: {
    light: '#f73378',
    main: '#f50057',
    dark: '#ab003c',
  },
}

type ColorKeys = keyof typeof colors
export type Color = (typeof colors)[ColorKeys]
