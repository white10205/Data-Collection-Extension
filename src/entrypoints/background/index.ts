import { extractNotes } from '@/utils/extraData';
import { exportToExcel } from '@/utils/exportToExcel';
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

  const collectData: any[] = [];
  // 监听来自sidepanel等的消息
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'NOTE_DATA') {
      console.log('收到NOTE_DATA:', message.data);

      collectData.push(message.data);
    }

    if (message.type === 'EXPORT') {
      console.log('当前收集到的数据', collectData);
      const data = extractNotes(collectData);
      exportToExcel(data);
    }
  });

  console.log('background.js 加载完毕');
});
