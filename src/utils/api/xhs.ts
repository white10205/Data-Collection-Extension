import xhs from '@/utils/request/xhs';
let tabId: number | null = null;

const getTabId = async () => {
  if (tabId) return;
  let [tab] = await browser.tabs.query({
    active: true,
    url: `*://${new URL('https://www.xiaohongshu.com').hostname}/*`,
  });

  if (!tab) {
    tab = await new Promise(async (resolve) => {
      tab = await browser.tabs.create({ url: 'https://www.xiaohongshu.com' });
      const check = async () => {
        tab = await browser.tabs.get(tab.id!);
        if (tab.status === 'complete') {
          resolve(tab);
        } else {
          setTimeout(check, 500);
        }
      };
      check();
    });
  }
  tabId = tab.id as number;
  console.log('tabid', tabId);
};
async function apiPost(path: string, data: any, method: string) {
  await getTabId();
  const baseURL = 'https://edith.xiaohongshu.com/api/sns/web/v1';

  const body = {
    url: `${baseURL}${path}`,
    method: method,
    data,
  };
  const res = await xhs({
    tabId: tabId,
    ...(body as any),
  });
  console.log('响应结果！！！', res);
}

// 文章详情页的内容接口 feed
export async function getDetailPageData(
  source_note_id: string,
  xsec_token: string
) {
  console.log('获取小红书数据！！！');
  const data = {
    source_note_id: source_note_id,
    image_formats: ['jpg', 'webp', 'avif'],
    extra: {
      need_body_topic: '1',
    },
    xsec_source: 'pc_feed',
    xsec_token: xsec_token,
  };
  return await apiPost('/feed', data, 'POST');
}

// 搜索关键字获取文章数据的接口 note
export async function getSearchContent(keyword: string) {
  const data = {
    keyword: keyword,
    page: 1,
    page_size: 20,
    search_id: '2f0iyxszsz86wsbt5yj7w',
    sort: 'general',
    note_type: 0,
    ext_flags: [],
    geo: '',
    image_formats: ['jpg', 'webp', 'avif'],
  };
  return await apiPost('/search/notes', data, 'POST');
}
