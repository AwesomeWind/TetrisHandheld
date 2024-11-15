import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',  // 设置源文件的根目录
  build: {
    outDir: '../dist', // 打包输出目录
    sourcemap: true,
  }
})
