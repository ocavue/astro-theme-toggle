import { getTheme, applyTheme } from './theme.ts'

function setupTheme() {
  applyTheme(getTheme())
}

// Set the theme on load
setupTheme()

// Set the theme after a page swap
document.addEventListener('astro:after-swap', setupTheme)

// Set the theme when the user changes their system preference
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', setupTheme)
