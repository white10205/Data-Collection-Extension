<template>
  <div class="container">
    <Header></Header>
    <hr />
    <!-- <TreeList></TreeList> -->
    <CollectNoteData />
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/sidepanel/Header.vue';
import TreeList from '@/components/sidepanel/TreeList.vue';
import CollectNoteData from '@/components/sidepanel/CollectNoteData.vue';
</script>

<style scoped>
.container {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
</style>
