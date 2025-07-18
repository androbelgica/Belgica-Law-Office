import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.jsx"],
            refresh: true,
            base: "/", // or leave as default
        }),
        react(),
    ],
    server: {
        https: true, // for local dev only
    },
    build: {
        outDir: "public/build",
        manifest: true,
        rollupOptions: {
            output: {
                entryFileNames: "[name].js",
                chunkFileNames: "[name]-[hash].js",
                assetFileNames: "[name][extname]",
                // Add this line to force manifest to root of build dir
                manualChunks: undefined,
            },
        },
    },
});
