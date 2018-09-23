// primary and secondary are foreground colors
// backgound should be in contrast with primary and secondary
// background should be in contrast with text colors

interface Theme {
  background: string
  primary: string
  secondary: string
  textPrimary: string
  textSecondary: string
}

export const darkTheme: Theme = {
  background: '#121212',
  primary: 'teal',
  secondary: 'coral',
  textPrimary: '#e2e2e2',
  textSecondary: '#888888',
}
