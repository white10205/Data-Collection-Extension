import xhs from "@/utils/request/xhs";
let tabId: number | null = null;

// 生成随机的 search_id
function generateSearchId(length = 20): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  // 浏览器环境使用 crypto.getRandomValues()
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const values = new Uint32Array(length);
    crypto.getRandomValues(values);
    for (let i = 0; i < length; i++) {
      result += chars[values[i] % chars.length];
    }
  }
  // Node.js 环境
  else {
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
  }

  return result;
}

// 获取当前tabid
const getTabId = async () => {
  if (tabId) return;
  let [tab] = await browser.tabs.query({
    active: true,
    url: `*://${new URL("https://www.xiaohongshu.com").hostname}/*`,
  });

  if (!tab) {
    tab = await new Promise(async (resolve) => {
      tab = await browser.tabs.create({ url: "https://www.xiaohongshu.com" });
      const check = async () => {
        tab = await browser.tabs.get(tab.id!);
        if (tab.status === "complete") {
          resolve(tab);
        } else {
          setTimeout(check, 500);
        }
      };
      check();
    });
  }
  tabId = tab.id as number;
  console.log("tabid", tabId);
};

// 调用小红书api
async function apiPost(path: string, data: any, method: string) {
  await getTabId();
  const baseURL = "https://edith.xiaohongshu.com/api/sns/web/v1";

  const body = {
    url: `${baseURL}${path}`,
    method: method,
    data,
  };
  const res = await xhs({
    tabId: tabId,
    ...(body as any),
  });
  console.log("响应结果！！！", res);
  return res.data;
}

// 文章详情页的内容接口 feed
export async function getDetailPageData(source_note_id: string, xsec_token: string) {
  console.log("获取小红书数据！！！");
  const data = {
    source_note_id: source_note_id,
    image_formats: ["jpg", "webp", "avif"],
    extra: {
      need_body_topic: "1",
    },
    xsec_source: "pc_feed",
    xsec_token: xsec_token,
  };
  return await apiPost("/feed", data, "POST");
}

// 搜索关键字获取文章数据的接口 note
export async function getSearchContent(keyword: string, page: number) {
  const data = {
    keyword: keyword,
    page: page,
    page_size: 20,
    search_id: generateSearchId(),
    sort: "general",
    note_type: 0,
    ext_flags: [],
    geo: "",
    image_formats: ["jpg", "webp", "avif"],
  };
  return await apiPost("/search/notes", data, "POST");
}

export async function getUserNote(userId: string, xsec_token: string, cursor?: string) {
  let url = `/user_posted?user_id=${userId}&num=20&image_formats=jpg,webp,avif&xsec_token=${encodeURIComponent(
    xsec_token
  )}&xsec_source=pc_feed`;
  if (cursor) {
    url += `&cursor=${cursor}`;
  }
  await getTabId();
  const baseURL = "https://edith.xiaohongshu.com/api/sns/web/v1";
  const body = {
    url: `${baseURL}${url}`,
    method: "GET",
  };
  const res = await xhs({
    tabId: tabId,
    ...(body as any),
  });
  return res.data;
}
