const key = '_ocavue_css_theme'

export const LIGHT = 'light'
export const DARK = 'dark'
export const SYSTEM = 'system'

export type Theme = typeof LIGHT | typeof DARK | typeof SYSTEM
export type DisplayTheme = typeof LIGHT | typeof DARK

let currentTheme: Theme | undefined

function getSystemTheme(): DisplayTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? DARK
    : LIGHT
}

function getStoredTheme(): Theme | null | undefined {
  return localStorage.getItem(key) as Theme | null
}

function setStoredTheme(theme: Theme): void {
  localStorage.setItem(key, theme)
}

/**
 * Gets the current theme, which is either "light", "dark", or "system".
 */
export function getTheme(): Theme {
  return currentTheme || getStoredTheme() || getSystemTheme()
}

function toDisplayTheme(theme: Theme | null | undefined): DisplayTheme {
  return theme === LIGHT || theme === DARK ? theme : getSystemTheme()
}

/**
 * Gets the current theme for display, which is either "light" or "dark".
 */
export function getDisplayTheme(): DisplayTheme {
  return toDisplayTheme(currentTheme || getStoredTheme())
}

/**
 * Sets the current theme and applies it to the document.
 */
export function applyTheme(theme: Theme): void {
  setStoredTheme(theme)

  const root = document.documentElement
  const displayTheme = toDisplayTheme(theme)

  root.classList.toggle(DARK, displayTheme === DARK)
  root.dataset.theme = displayTheme
  root.style.colorScheme = displayTheme
}

/**
 * Updates the current theme and applies it to the document. If the theme has changed, it will notify all subscribers.
 */
export function updateTheme(newTheme: Theme): void {
  const changed = currentTheme !== newTheme
  applyTheme(newTheme)
  if (changed) {
    handlers.forEach((handler) => handler())
  }
}

/**
 * Toggles the current theme between "light" and "dark". You can pass an optional theme to set it explicitly.
 */
export function toggleTheme(theme?: Theme): void {
  updateTheme(theme || (getDisplayTheme() === LIGHT ? DARK : LIGHT))
}

const handlers = new Set<() => void>()

export function subscribeThemeChange(callback: () => void): () => void {
  const handler = () => {
    callback()
  }
  handlers.add(handler)
  return () => {
    handlers.delete(handler)
  }
}

declare global {
  interface Window {
    [key]?: Theme
  }
}
