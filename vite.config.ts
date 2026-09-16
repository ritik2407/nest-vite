// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; // or react()
import { resolve } from 'path';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm-bundler.js',
        },
    },
    build: {
        manifest: true, // Crucial: Generates manifest.json for NestJS in production
        outDir: 'dist/public',
        rollupOptions: {
            // Point this to your frontend code entry point
            input: resolve(__dirname, 'src/resource/main.ts'),
        },
    },
});
