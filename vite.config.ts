import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import { resolve } from "path";
import { wrapperEnv } from "./build/getEnv";
import { createProxy } from "./build/proxy";
import { createVitePlugins } from "./build/plugins";
import pkg from "./package.json";
import dayjs from "dayjs";

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
};

// @see: https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);

  const event = process.env.npm_lifecycle_event

  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
      }
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/var.scss";`
        }
      }
    },
    server: {
      host: "0.0.0.0",
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      // Load proxy configuration from .env.development
      // proxy: createProxy(viteEnv.VITE_PROXY)
      proxy: {
        // 物联平台
        '/dmp': {
          // 目标地址
           target: 'https://rest.maxdoop.com',
          // target: 'http://192.168.4.189:9368',
          // target: 'http://192.167.4.88:8067',
          // target: 'http://192.168.4.12:9368',
          // 是否改变请求的源地址，这里设置为 true，表示强制使用绝对路径
          changeOrigin: true,
          // 路径重写规则，这里将 /api 开头的请求路径替换为空字符串，即去掉 /dmp 前缀
          // rewrite: (path) => path.replace(/^\/dmp/, '')
        },
        // 运维中心
        '/bsp': {
          // 目标地址
          target: 'https://rest.maxdoop.com',
          // target: 'http://192.168.4.189:9360',
          // target: 'http://192.168.4.88:8077',
          // target: 'http://192.168.4.12:9360',
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/bsp/, '')  
        },
        // app  
        '/app': {
          // 目标地址
          target: 'https://rest.maxdoop.com',
          //  target: 'http://192.168.4.189:9380',
          //  target: 'http://192.168.4.88:8087',
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/app/, '')
        },
      }
    },
    plugins: createVitePlugins(viteEnv),
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
    },
    build: {
      outDir: "dist",
      minify: "esbuild",
      // esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
      // minify: "terser",
      // terserOptions: {
      // 	compress: {
      // 		drop_console: viteEnv.VITE_DROP_CONSOLE,
      // 		drop_debugger: true
      // 	}
      // },
      sourcemap: false,
      // 禁用 gzip 压缩大小报告，可略微减少打包时间
      reportCompressedSize: false,
      // 规定触发警告的 chunk 大小
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  };
});
