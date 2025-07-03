export default defineBackground(() => {
  /// background.js

  // 检查URL是否属于小红书
  // function isXiaohongshu(url: string) {
  //   return url && url.includes('xiaohongshu.com');
  // }

  // // 监听插件图标点击
  // chrome.action.onClicked.addListener(async (tab) => {
  //   console.log('当前网址', tab.url);

  //   if (isXiaohongshu(tab.url as string)) {
  //     // 小红书网站 → 打开Side Panel
  //     await chrome.sidePanel.open({ tabId: tab.id, windowId: tab.windowId });
  //     await chrome.sidePanel.setOptions({
  //       tabId: tab.id,
  //       path: 'sidepanel.html',
  //       enabled: true,
  //     });
  //   } else {
  //     // 非小红书网站 → 打开Popup
  //     chrome.action.setPopup({
  //       tabId: tab.id,
  //       popup: 'popup.html',
  //     });
  //   }
  // });

  console.log('background.js 加载完毕');
});
