import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: './src/inline-script.ts',
    outDir: './dist',
    minify: true,
    sourcemap: false,
    dts: false,
    format: 'iife',
  },
  {
    entry: [
      './src/index.ts',
      './src/custom-element.ts',
      './src/theme.ts',
      './src/react/index.ts',
    ],
    outDir: './dist',
    minify: false,
    sourcemap: true,
    dts: true,
    format: 'esm',
    platform: 'browser',
  },
])
