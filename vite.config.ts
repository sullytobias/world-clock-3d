import { defineConfig } from "vite";

export default defineConfig({
    base: "/world-clock-3d/", // Your repository name
    build: {
        outDir: "dist", // Ensure this matches your deployment script
    },
});
