import { defineConfig } from 'vite'


export default defineConfig({
    build: {
        lib: {
            entry: './src/main.ts',
            name: 'config-exec',
            fileName: 'config-exec',
        },
        rollupOptions: {
            external: ['commander', 'inquirer', 'child_process', 'fs/promises', 'path']
        },
        sourcemap: true
    }
  })