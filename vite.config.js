import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { ViteMinifyPlugin } from "vite-plugin-minify";

export default defineConfig({
    plugins: [
        tailwindcss(),
        ViteMinifyPlugin([]),
    ],
    build: {
        outDir: "dist",
        minify: true,
    },
    server: {
        allowedHosts: ["majority-flickr-pieces-leonard.trycloudflare.com"]
    }
});