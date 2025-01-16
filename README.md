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

2. Add the `Toggle` component to your `<body>` to toggle the theme:

   ```astro
   ---
   import { Toggle } from 'astro-theme-toggle'
   ---

   <Toggle style="width: 32px; height: 32px;" />
   ```

3. You can customize the icon by passing a `Fragment` with the `icon-light` and `icon-dark` slots.

   ```astro
   ---
   import { Toggle } from 'astro-theme-toggle'
   import MyLightIcon from './my-light-icon.astro'
   import MyDarkIcon from './my-dark-icon.astro'
   ---

   <Toggle style="width: 32px; height: 32px;">
     <Fragment slot="icon-light">
       <MyLightIcon />
     </Fragment>
     <Fragment slot="icon-dark">
       <MyDarkIcon />
     </Fragment>
   </Toggle>
   ```

## Live Examples

- [Astrobook](https://astrobook.pages.dev/)
- [Ocavue's Blog](https://ocavue.com)

## License

MIT
