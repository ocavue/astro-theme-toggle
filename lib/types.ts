export type Theme = 'light' | 'dark'

declare global {
  interface Window {
    themeToggle?: {
      setTheme?: (theme: 'dark' | 'light') => void
      getTheme?: () => 'dark' | 'light'
    }
  }
}
