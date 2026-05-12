import react from '@astrojs/react'
import vue from '@astrojs/vue'
import expressiveCode from 'astro-expressive-code'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  srcDir: './website',
  integrations: [react(), expressiveCode(), vue()],
})
