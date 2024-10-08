import { defineEcConfig } from 'astro-expressive-code'

// https://expressive-code.com/reference/configuration/
export default defineEcConfig({
  themeCssRoot: 'html',
  themeCssSelector: (theme) => {
    if (theme.name.includes('dark')) {
      return '.dark'
    }
    return ''
  },
})
