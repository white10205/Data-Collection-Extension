import { extractNotes } from '@/utils/extraData';
import { exportToExcel } from '@/utils/exportToExcel';
export default defineBackground(() => {


  // 小红书域名匹配规则
  const XIAOHONGSHU_DOMAINS = [
    'xiaohongshu.com',
    'www.xiaohongshu.com',
    'xhscdn.com'
  ];

  // 检查是否是小红书页面
  function isXiaohongshuPage(url?: string): boolean {
    if (!url) return false;
    try {
      const { hostname } = new URL(url);
      return XIAOHONGSHU_DOMAINS.some(domain => hostname.endsWith(domain));
    } catch {
      return false;
    }
  }

  // 处理扩展图标点击
  browser.action.onClicked.addListener(async (tab) => {
    const isXhs = isXiaohongshuPage(tab.url);

    if (isXhs) {
      // 小红书页面：打开侧边面板
      //@ts-ignore
      await browser.sidePanel.open({ windowId: tab.windowId });
    } else {
      // 非小红书页面：打开弹出窗口
      await browser.windows.create({
        url: browser.runtime.getURL('/popup.html'),
        type: 'popup',
        width: 400,
        height: 600,
        focused: true
      });
    }
  });

  // // 动态更新扩展图标提示
  // browser.tabs.onActivated.addListener(async ({ tabId }) => {
  //   const tab = await browser.tabs.get(tabId);
  //   const isXhs = isXiaohongshuPage(tab.url);

  //   browser.action.setTitle({
  //     tabId,
  //     title: isXhs ? '打开小红书采集面板' : '打开数据采集工具'
  //   });
  // });

  // // 标签页更新时处理
  // browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  //   if (changeInfo.url || changeInfo.status === 'complete') {
  //     const isXhs = isXiaohongshuPage(tab.url);

  //     browser.action.setTitle({
  //       tabId,
  //       title: isXhs ? '打开小红书采集面板' : '打开数据采集工具'
  //     });
  //   }
  // });

  let collectData: any[] = [];
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
      collectData = []
    }
  });

  console.log('background.js 加载完毕');
});
