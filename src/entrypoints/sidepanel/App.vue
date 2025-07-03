<template>
  <div class="container">
    <Header></Header>
    <hr />
    <TreeList></TreeList>
    <!-- <CollectNoteData :submit="submit" /> -->
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/sidepanel/Header.vue';
import TreeList from '@/components/sidepanel/TreeList.vue';
import CollectNoteData from '@/components/sidepanel/CollectNoteData.vue';
import { getSearchContent, getDetailPageData } from '@/utils/api/xhs.ts';

const collectNoteByKeyWorld = async (
  keyword: string,
  num: number,
  type: string[]
) => {
  const notesList = await getSearchContent(keyword, num);

  console.log('笔记列表', notesList);
};

onMounted(async () => {
  const notesList = await getSearchContent('文案');

  console.log('笔记列表', notesList);
});
</script>

<style scoped>
.container {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
</style>
