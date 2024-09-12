;(() => {
  type Theme = 'light' | 'dark'

  const storageKey = 'theme-toggle'

  function getSystemTheme(): Theme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  function getUserTheme(): Theme | null {
    const theme = localStorage.getItem(storageKey)
    return theme === 'dark' || theme === 'light' ? theme : null
  }

  function getTheme(): Theme {
    return getUserTheme() || getSystemTheme()
  }

  function setUserTheme(theme: Theme) {
    if (theme === getSystemTheme()) {
      localStorage.removeItem(storageKey)
    } else {
      localStorage.setItem(storageKey, theme)
    }
  }

  function setStyle(theme: Theme) {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme
  }

  function setTheme(theme: Theme) {
    setUserTheme(theme)
    setStyle(theme)
  }

  // Set the theme on load
  setTheme(getTheme())

  if (!window.themeToggle) {
    window.themeToggle = {}
  }
  window.themeToggle.setTheme = setTheme
  window.themeToggle.getTheme = getTheme
})()
