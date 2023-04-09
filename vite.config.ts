import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import unnoCSS from 'unocss/vite'
import { presetUno } from 'unocss/preset-uno'
import { presetIcons } from 'unocss/preset-icons'

export default defineConfig({
	plugins: [
		sveltekit(),
		unnoCSS({
      presets: [
        presetUno(),
        presetIcons()
      ]
    })
	],
});
