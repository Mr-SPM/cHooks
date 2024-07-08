import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts';


// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  build: {
    lib: {
      entry: resolve(__dirname, './src/hooks/index.tsx'),
      name: 'Chooks',
      fileName: 'c-hooks',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'reactDOM'
        }
      }
    }
  },
  plugins: command === 'serve' ? [react()] : [dts({
    entryRoot: resolve(__dirname, './src/hooks'),
    outDir: 'dist2',
    rollupTypes: true
  })],
 
}))
