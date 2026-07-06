export type Theme = 'light' | 'dark'

declare global {
  interface Window {
    astroThemeToggle?: {
      setTheme?: (theme: 'dark' | 'light') => void
      getTheme?: () => 'dark' | 'light'
    }
  }
}

export function getTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') {
    return 'light'
  }
  const api = window.astroThemeToggle
  return api?.getTheme?.() || 'light'
}

export function setTheme(theme: 'light' | 'dark') {
  if (typeof window === 'undefined') {
    return
  }
  const api = window.astroThemeToggle
  api?.setTheme?.(theme)
}

export function toggleTheme() {
  const theme = getTheme()
  setTheme(theme === 'light' ? 'dark' : 'light')
}
