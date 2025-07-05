import { defineConfig } from "wxt";

export default defineConfig({
  modules: ["@wxt-dev/module-vue"],
  srcDir: "src",
  outDir: "dist",
  manifest: {
    name: "数据采集插件",
    description: "数据采集插件",
    permissions: ["tabs", "scripting", "cookies", "downloads", "sidePanel"],
    host_permissions: ["<all_urls>"],
    action: {
      default_title: "欢迎",
    },
    side_panel: {
      default_path: "sidepanel.html",
    },
  },
});
