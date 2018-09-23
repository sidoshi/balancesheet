// primary and secondary are foreground colors
// backgound should be in contrast with primary and secondary
// background should be in contrast with text colors

interface Theme {
  backgroundPrimary: string
  backgroundSecondary: string
  backgroundTertiary: string
  primary: string
  secondary: string
  textPrimary: string
  textSecondary: string
}

export const darkTheme: Theme = {
  backgroundPrimary: '#121212',
  backgroundSecondary: '#232323',
  backgroundTertiary: '#343434',
  primary: 'teal',
  secondary: 'coral',
  textPrimary: '#e2e2e2',
  textSecondary: '#888888',
}