import { defineConfig } from 'wxt';

export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-vue'],
  srcDir: 'src',
  outDir: 'dist',
  manifest: {
    name: '数据采集插件',
    description: '数据采集插件',
    permissions: ['tabs', 'scripting', 'cookies'],
    host_permissions: ['<all_urls>'],
  },
});
