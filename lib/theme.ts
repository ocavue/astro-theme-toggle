export type Theme = 'light' | 'dark'

declare global {
  interface Window {
    themeToggle?: {
      setTheme?: (theme: 'dark' | 'light') => void
      getTheme?: () => 'dark' | 'light'
    }
  }
}

export function getTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') {
    return 'light'
  }
  return window.themeToggle?.getTheme?.() || 'light'
}

export function setTheme(theme: 'light' | 'dark') {
  if (typeof window === 'undefined') {
    return
  }
  window.themeToggle?.setTheme?.(theme)
}

export function toggleTheme() {
  const theme = getTheme()
  setTheme(theme === 'light' ? 'dark' : 'light')
}
