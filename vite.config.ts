import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

const vitePWA = VitePWA({
  registerType: 'autoUpdate',
  outDir: 'dist',
  manifest: {
    name: 'React Notepad',
    short_name: 'ReactNotepad',
    theme_color: '#1976d2',
    background_color: '#fafafa',
    display: 'standalone',
    start_url: '/',
    scope: '/',
    orientation: 'portrait-primary',
    icons: [
      {
        src: 'assets/icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'assets/icons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePWA],
});

