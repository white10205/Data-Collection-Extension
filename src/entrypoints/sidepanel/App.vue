<template>
  <div class="container">你好！！！</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import xhs from '@/utils/request/xhs';
// onMounted(async () => {
//   let [tab] = await browser.tabs.query({
//     active: true,
//     url: `*://${new URL('https://www.xiaohongshu.com').hostname}/*`,
//   });
//   if (!tab) {
//     tab = await new Promise(async (resolve) => {
//       tab = await browser.tabs.create({ url: 'https://www.xiaohongshu.com' });
//       const check = async () => {
//         tab = await browser.tabs.get(tab.id!);
//         if (tab.status === 'complete') {
//           resolve(tab);
//         } else {
//           setTimeout(check, 500);
//         }
//       };
//       check();
//     });
//   }
//   const data = {
//     source_note_id: '68464b91000000002002ab97',
//     image_formats: ['jpg', 'webp', 'avif'],
//     extra: {
//       need_body_topic: '1',
//     },
//     xsec_source: 'pc_feed',
//     xsec_token: 'ABacGEnAFYR2ZWgzS5_JkrNWTr2nP6SbqfToN47F8GJts=',
//   };
//   const body = {
//     url: 'https://edith.xiaohongshu.com/api/sns/web/v1/feed',
//     method: 'POST',
//     data,
//   };
//   const res = await xhs({
//     tabId: tab.id,
//     ...(body as any),
//   });
//   console.log('响应结果！！！', res);
// });
</script>

<style scoped>
.container {
  box-sizing: border-box;
  height: 250px;
  width: 250px;
}
</style>
