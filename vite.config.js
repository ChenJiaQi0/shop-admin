import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Windicss from 'vite-plugin-windicss'
// import windicss from 'windicss'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Windicss()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, 'src')
    }
  }
})
