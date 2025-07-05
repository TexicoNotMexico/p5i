import { defineConfig } from "vite";

export default defineConfig({
    optimizeDeps: {
        include: ["p5"],
    },
    base: "/p5i/",
});
