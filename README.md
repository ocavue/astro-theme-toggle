# [astro-theme-toggle](https://astro-theme-toggle.pages.dev)

[![NPM version](https://img.shields.io/npm/v/astro-theme-toggle?color=a1b858&label=)](https://www.npmjs.com/package/astro-theme-toggle)

Add a ripple-style theme toggle animation to your Astro project with ease.

https://github.com/user-attachments/assets/19069840-629d-445b-82e7-aea142242225

## Installation

```bash
npm install astro-theme-toggle
```

## Usage

1. Add the `ThemeScript` component to your `<head>`. This will set the
   `data-theme` attribute and toggle the `dark` class on your `<html>` element
   based on the user's theme preference.

   ```astro
   ---
   import { ThemeScript } from 'astro-theme-toggle';
   ---
   <head>
     <meta charset="utf-8" />
     <meta name="viewport" content="width=device-width,initial-scale=1" />
     <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
     <ThemeScript />
     <!-- other head elements -->
   </head>
   ```

2. Add a button to your `<body>` to toggle the theme:

   ```astro
   <button id="theme-toggle">
     <!-- https://lucide.dev/icons/moon -->
     <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
     <!-- https://lucide.dev/icons/sun -->
     <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
   </button>

   <script>
    import { handleToggleClick } from 'astro-theme-toggle'
    const addListener = () => {
      document
        .getElementById('theme-toggle')
        ?.addEventListener('click', handleToggleClick)
    }
    addListener()
    document.addEventListener('astro:after-swap', addListener)
   </script>

   <style is:global>
     .icon-sun {
       display: block;
     }
     .icon-moon {
       display: none;
     }
     .dark .icon-sun {
       display: none;
     }
     .dark .icon-moon {
       display: block;
     }
   </style>
   ```

## Live Examples

- [Astrobook](https://astrobook.pages.dev/)
- [Ocavue's Blog](https://ocavue.com)

## License

MIT
