<template>
  <div class="container">
    <Header :back="back"></Header>
    <hr />
    <TreeList v-if="collect_type === ''" :change="changeCollectType"></TreeList>
    <!-- 根据博主链接采集笔记 -->
    <CollectUserNoteData v-else-if="collect_type === '3'" :submit="collectNoteByUserLink"></CollectUserNoteData>
    <!-- 根据笔记链接采集笔记 -->
    <CollectNoteByLink
      v-else-if="collect_type === '4' && !is_collecting"
      :submit="collectNoteByLink"
    ></CollectNoteByLink>
    <!-- 根据关键词采集笔记 -->
    <CollectNoteData v-else-if="collect_type === '5' && !is_collecting" :submit="collectNoteByKeyWorld" />
    <div class="progress" v-else-if="collect_type === '6'">
      <h3 class="">{{ status }}</h3>
      <van-progress style="width: 90%" :percentage="progress" stroke-width="8" />
      <van-button type="success" @click="exportTo" :loading="is_collecting" loading-text="正在收集中"
        >导出为Excel</van-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from "@/components/sidepanel/Header.vue";
import TreeList from "@/components/sidepanel/TreeList.vue";
import CollectNoteData from "@/components/sidepanel/CollectNoteData.vue";
import CollectUserNoteData from "@/components/sidepanel/CollectUserNoteData.vue";
import CollectNoteByLink from "@/components/sidepanel/CollectNoteByLink.vue";
import { getSearchContent, getDetailPageData, getUserNote } from "@/utils/api/xhs";
import requestQueue from "@/utils/requestQueue";
import { showToast } from "vant";
const collect_type = ref("");
const is_collecting = ref(false);
const status = ref("");
const progress = computed(() => {
  if (target_num.value === 0) return 0;
  return Math.min(Number((collected.value / target_num.value).toFixed(1)) * 100, 100);
});
const target_num = ref(0);
// 获取到的数量
const collected = ref(0);

// 收集小红书笔记根据关键词
const collectNoteByKeyWorld = async (keyword: string, num: number, type: string[]) => {
  collected.value = 0;
  target_num.value = num;
  collect_type.value = "6";
  is_collecting.value = true;
  status.value = "正在处理中";
  if (num <= 0) return [];

  let page = 1;

  try {
    while (collected.value < num) {
      // 获取笔记列表
      const notesList = await getSearchContent(keyword, page);

      console.log("noteList", notesList);

      if (!notesList.success) {
        throw new Error(notesList.msg);
      }
      // 如果没有更多数据，提前结束
      if (!notesList.data.items.length) break;

      // 处理当前页的笔记
      for (const note of notesList.data.items) {
        if (collected.value >= num) break;

        // 将请求加入队列（自动控制频率）
        const detail = await requestQueue.add(() => getDetailPageData(note.id, note.xsec_token));
        if ((detail as any).success === true) {
          browser.runtime.sendMessage({
            type: "NOTE_DATA",
            data: detail.data.items[0],
          });
        } else {
          throw new Error(detail.msg);
        }
        collected.value++;
      }

      // 检查是否还有更多数据
      if (!notesList.data.has_more || collected.value >= num) break;

      page++;
    }
    status.value = "收集完成，点击导出";
    is_collecting.value = false;
  } catch (e: any) {
    showToast(e.message);
    is_collecting.value = false;
    status.value = `收集终止！当前已收集 ${collected.value}条笔记`;
  }
};

// 收集小红书笔记根据博主链接
const collectNoteByUserLink = async (urls: string[], num: number) => {
  collected.value = 0;
  target_num.value = num;
  collect_type.value = "6";
  is_collecting.value = true;
  status.value = "正在处理中";
  if (num <= 0) return [];

  let page = 1;

  try {
    for (let url of urls) {
      console.log("链接", url);
      // 增强URL解析逻辑
      const match = url.match(
        /^https:\/\/www\.xiaohongshu\.com\/user\/profile\/([a-zA-Z0-9]+)(?:\?xsec_token=([^&]+))?(?:&xsec_source=([^&]+))?/
      );
      let userId, xsecToken;

      if (match) {
        console.log("匹配成功");

        userId = match[1];
        xsecToken = match[2];
      }

      console.log("作者信息", userId, xsecToken);

      // 获取笔记列表
      const notesList = await getUserNote(userId as string, xsecToken as string);

      // 如果没有更多数据，提前结束
      if (!notesList.data.notes.length) break;

      for (const note of notesList.data.notes) {
        if (collected.value >= num) break;

        // 将请求加入队列（自动控制频率）
        const detail = await requestQueue.add(() => getDetailPageData(note.note_id, note.xsec_token));
        if (detail.success === true) {
          browser.runtime.sendMessage({
            type: "NOTE_DATA",
            data: detail.data.items[0],
          });
        } else {
          throw new Error("访问频率过快已被限制，请重启重试");
        }
        collected.value++;
      }

      // 检查是否还有更多数据
      if (!notesList.data.has_more || collected.value >= num) break;

      page++;
    }
    status.value = "收集完成，点击导出";
    is_collecting.value = false;
  } catch (e: any) {
    showToast(e.message);
    is_collecting.value = false;
    status.value = `收集终止！当前已收集 ${collected.value}条笔记`;
  }
};

// 收集小红书笔记根据链接
const collectNoteByLink = async (urls: string[]) => {
  collected.value = 0;
  target_num.value = urls.length;
  collect_type.value = "6";
  is_collecting.value = true;
  status.value = "正在处理中";
  if (urls.length <= 0) return;
  try {
    for (let url of urls) {
      const match = url.match(/explore\/([a-zA-Z0-9]+)\?xsec_token=([^&]+)/);
      let noteId: string, xsecToken: string;
      if (match) {
        noteId = match[1]; // 684ead71000000000f03352c
        xsecToken = match[2]; // ABoH9PIxDlMGAi8tqwC61aU33JG7QpQHpoiVpnMJz2_Dk=
      }
      const detail = await requestQueue.add(() => getDetailPageData(noteId, xsecToken));

      if ((detail as any).success === true) {
        browser.runtime.sendMessage({
          type: "NOTE_DATA",
          data: detail.data.items[0],
        });
      } else {
        throw new Error("访问频率过快已被限制，请重启重试");
      }
      collected.value++;
    }
    status.value = "收集完成，点击导出";
    is_collecting.value = false;
  } catch (e: any) {
    showToast(e.message);
    is_collecting.value = false;
    status.value = `收集终止！当前已收集 ${collected.value}条笔记`;
  }
};

// 更改采集选项
const changeCollectType = (type: string) => {
  collect_type.value = type;
};

// 开始导出
const exportTo = () => {
  browser.runtime.sendMessage({
    type: "EXPORT",
  });
};
const back = () => {
  collect_type.value = "";
};
</script>

<style scoped>
.container {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
.progress {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
</style>
