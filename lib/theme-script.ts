;(() => {
  type Theme = 'light' | 'dark'

  const storageKey = 'theme-toggle'

  let currentTheme: Theme | undefined

  function getSystemTheme(): Theme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  function getStoredTheme(): Theme | null {
    const theme = localStorage.getItem(storageKey)
    return theme === 'dark' || theme === 'light' ? theme : null
  }

  function getTheme(): Theme {
    return currentTheme || getStoredTheme() || getSystemTheme()
  }

  function setStoredTheme(theme: Theme) {
    if (theme === getSystemTheme()) {
      localStorage.removeItem(storageKey)
    } else {
      localStorage.setItem(storageKey, theme)
    }
  }

  function setStyle(theme: Theme) {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.dataset.theme = theme
    root.style.colorScheme = theme
  }

  function setTheme(theme: Theme) {
    currentTheme = theme
    setStoredTheme(theme)
    setStyle(theme)
  }

  function setupTheme() {
    setTheme(getTheme())
  }

  // Set the theme on load
  setupTheme()

  // Set the theme after a page swap
  document.addEventListener('astro:after-swap', setupTheme)

  window.astroThemeToggle = { setTheme, getTheme }
})()
