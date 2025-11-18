// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import { createHtmlPlugin } from 'vite-plugin-html'

// -------------------------------
// fbg 模板配置（增强版）
// -------------------------------
export default defineConfig(() => {
  // CLI 注入的环境变量，指向用户目录下的 .fbg/generated/
  const generatedDir = process.env.FBG_GENERATED
    ? path.resolve(process.env.FBG_GENERATED)
    : path.resolve(__dirname, 'src/config') // 本地调试备用

  const sitePath = path.resolve(generatedDir, 'site.json');
  const generatedRoot = generatedDir;
  let site = {}

  // 尝试读取 site.json
  if (fs.existsSync(sitePath)) {
    try {
      site = JSON.parse(fs.readFileSync(sitePath, 'utf-8'))
    } catch (err) {
      console.warn('[FBG] 解析 site.json 失败:', err)
    }
  } else {
    console.warn('[FBG] 未找到 site.json，使用默认配置')
  }

  return {
    base: './', // 兼容 GitHub Pages
    plugins: [
      react(),
      // 注入 site.json 数据到 index.html
      createHtmlPlugin({
        minify: true,
        inject: {
          data: { site }
        }
      })
    ],
    resolve: {
      alias: {
        // 将虚拟模块 'fbg-generated' 指向 site.json
        'fbg-generated': sitePath,
        'fbg-gen-root': generatedRoot
      }
    },
    define: {
      // 让 React 代码中也能直接使用 site 配置
      __SITE__: JSON.stringify(site)
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true
    },
    server: {
      port: 5173,
      open: true
    }
  }
})
