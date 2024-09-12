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
