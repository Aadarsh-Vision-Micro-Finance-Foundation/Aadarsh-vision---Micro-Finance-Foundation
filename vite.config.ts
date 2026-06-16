import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/__tests__/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'src/main.tsx',
        'src/vite-env.d.ts',
        '**/*.d.ts',
        'src/assets/**',
        'src/__tests__/setup.ts',
      ],
    },
  },
})
