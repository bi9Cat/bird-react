import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // 项目根目录
  root: "./",
  // 开发服务器配置
  server: {
    port: 3000
  },
  // 构建配置
  build: {
    outDir: "dist",
  },
});
