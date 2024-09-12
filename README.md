# astro-theme-toggle

[![NPM version](https://img.shields.io/npm/v/astro-theme-toggle?color=a1b858&label=)](https://www.npmjs.com/package/astro-theme-toggle)

Create a ripple-style theme toggle animation in your Astro project.

## Installation

```bash
npm install astro-theme-toggle
```

## Usage

1. In your `<head>`, import the `theme-style.astro` component:

   ```astro
   ---
   import ThemeStyle from 'astro-theme-toggle/theme-style.astro';
   ---
   <head>
     <meta charset="utf-8" />
     <meta name="viewport" content="width=device-width,initial-scale=1" />
     <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
     <ThemeStyle />
     <!-- other head elements -->
   </head>
   ```

2. Add a button to your `<body>` to toggle the theme:

   ```astro
   <button class="size-6" id="theme-toggle">
     <span class="i-ph-sun dark:i-ph-moon size-6 inline-block"></span>
   </button>
   <script>
     import { handleToggleClick } from 'astro-theme-toggle'
     document
       .getElementById('theme-toggle')
       ?.addEventListener('click', handleToggleClick)
   </script>
   ```

## Live Examples

- [Astrobook](https://astrobook.pages.dev/)
- [Ocavue's Blog](https://ocavue.com)

## License

MIT
