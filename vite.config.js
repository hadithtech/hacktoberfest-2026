import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Plain Vite setup. The build packs everything (code, styles, fonts) into ONE
// dist/index.html, so you can open it by double-click, with no server.
export default defineConfig({
  base: './',
  plugins: [viteSingleFile()],
  build: { assetsInlineLimit: 100000000 },
})
