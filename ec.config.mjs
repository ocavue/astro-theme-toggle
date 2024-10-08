import { defineEcConfig } from 'astro-expressive-code'

// https://expressive-code.com/reference/configuration/
export default defineEcConfig({
  themeCssRoot: 'html',
  // themes: {light: "github-light", dark: 'github-dark'},
  themeCssSelector: (theme) => {
    console.log('theme.name', theme.name)
    if (theme.name.includes('dark')) {
      return '.dark'
    }
    return ''
  },
})
