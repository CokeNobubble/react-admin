import { ConfigEnv, defineConfig, loadEnv, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import UnoCSS from "unocss/vite";
// 用于支持svgIcon
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

const pathSrc = path.resolve(__dirname, "src");
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      UnoCSS(),
      react(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(pathSrc, "assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: Number(env.VITE_APP_PORT),
      host: true,
      open: true,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: "http://localhost:3005",
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""),
        },
      },
    },
    base: "/react/",
  };
});
