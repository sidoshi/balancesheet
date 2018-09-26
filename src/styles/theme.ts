// primary and secondary are foreground colors
// backgound should be in contrast with primary and secondary
// background should be in contrast with text colors

// This stays same whatever the theme is
const SHADOW_PRIMARY_COLOR = 'rgba(0,0,0,0.12)'
const SHADOW_SECONDARY_COLOR = 'rgba(0,0,0,0.24)'
const PRIMARY_COLOR = '#d71b2a'

export interface Theme {
  backgroundPrimary: string
  backgroundSecondary: string
  backgroundTertiary: string
  primary: string
  secondary: string
  textPrimary: string
  textSecondary: string
  shadowPrimary: string
  shadowSecondary: string
}

export const darkTheme: Theme = {
  backgroundPrimary: '#121212',
  backgroundSecondary: '#232323',
  backgroundTertiary: '#343434',
  secondary: 'coral',
  textPrimary: '#e2e2e2',
  textSecondary: '#888888',
  shadowPrimary: SHADOW_PRIMARY_COLOR,
  shadowSecondary: SHADOW_SECONDARY_COLOR,
  primary: PRIMARY_COLOR,
}

export default darkTheme
