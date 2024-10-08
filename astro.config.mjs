import react from '@astrojs/react'
import vue from '@astrojs/vue'
import { defineConfig } from 'astro/config'
import expressiveCode from 'astro-expressive-code'

// https://astro.build/config
export default defineConfig({
  srcDir: './website',
  integrations: [react(), expressiveCode(), vue()],
})
