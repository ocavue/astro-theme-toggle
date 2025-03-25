;(() => {
  type Theme = 'light' | 'dark'

  const storageKey = 'theme-toggle'

  let currentTheme: Theme | undefined

  function getSystemTheme(): Theme {
    const isLight = window.matchMedia('(prefers-color-scheme: light)')
    const isDark = window.matchMedia('(prefers-color-scheme: dark)')

    console.log(JSON.stringify({ isLight, isDark }))

    const isDarkMatches = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches

    const isLightMatches = window.matchMedia(
      '(prefers-color-scheme: light)',
    ).matches

    console.log(JSON.stringify({ isDarkMatches, isLightMatches }))

    const result: Theme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light'

    console.log('getSystemTheme', JSON.stringify({ result }))

    return result
  }

  function getStoredTheme(): Theme | null {
    const theme = localStorage.getItem(storageKey)
    return theme === 'dark' || theme === 'light' ? theme : null
  }

  function getTheme(): Theme {
    const a = currentTheme
    const b = getStoredTheme()
    const c = getSystemTheme()

    console.log(JSON.stringify({ a, b, c }))

    return a || b || c
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
