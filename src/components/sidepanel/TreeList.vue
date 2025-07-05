<template>
  <div class="tree-container">
    <div class="item" v-for="item in tree" :key="item.title">
      <h3 color="#bebdbd">{{ item.title }}</h3>
      <div class="btn" v-for="btn in item.func" :key="btn.desc" @click="props.change(btn.type)">{{ btn.desc }} ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps<{
  change: (type: string) => void;
}>();
const tree = ref([
  {
    title: "采集博主信息",
    func: [
      {
        desc: "批量导出博主信息",
        onclick: () => {
          console.log("采集");
        },
        type: "1",
      },
      {
        desc: "根据关键词采集",
        onclick: () => {
          console.log("采集");
        },
        type: "2",
      },
    ],
  },
  {
    title: "采集笔记数据",
    func: [
      {
        desc: "根据博主链接采集",
        onclick: () => {
          console.log("采集");
        },
        type: "3",
      },
      {
        desc: "根据笔记链接采集",
        onclick: () => {
          console.log("采集");
        },
        type: "4",
      },
      {
        desc: "根据关键词采集",
        onclick: () => {
          console.log("采集");
        },
        type: "5",
      },
    ],
  },
  {
    title: "采集评论数据",
    func: [
      {
        desc: "根据笔记链接采集",
        onclick: () => {
          console.log("采集");
        },
        type: "7",
      },
    ],
  },
  {
    title: "爆文排行榜",
    func: [
      {
        desc: "爆文排行榜开关",
        type: "8",
      },
    ],
  },
]);
</script>

<style scoped>
.tree-container {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 15px;
}
.item {
  width: 100%;
}
.btn {
  width: 80%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  cursor: pointer;
  border-radius: 5px;
}
.btn:hover {
  background-color: #e0e0e0;
}
</style>
