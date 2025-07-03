<template>
  <div class="tree-container">
    <div class="item" v-for="item in tree" :key="item.title">
      <h3 color="#bebdbd">{{ item.title }}</h3>
      <div class="btn" v-for="btn in item.func" :key="btn.desc">{{ btn.desc }} ></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const tree = ref([
  {
    title: '采集博主信息',
    func: [
      {
        desc: '根据博主链接采集',
        onclick: () => {
          console.log('采集');
        },
      },
      {
        desc: '根据关键词采集',
        onclick: () => {
          console.log('采集');
        },
      },
    ],
  },
  {
    title: '采集笔记数据',
    func: [
      {
        desc: '根据博主链接采集',
        onclick: () => {
          console.log('采集');
        },
      },
      {
        desc: '根据笔记链接采集',
        onclick: () => {
          console.log('采集');
        },
      },
      {
        desc: '根据关键词采集',
        onclick: () => {
          console.log('采集');
        },
      },
    ],
  },
  {
    title: '采集评论数据',
    func: [
      {
        desc: '根据笔记链接采集',
        onclick: () => {
          console.log('采集');
        },
      },
    ],
  },
]);
</script>

<style scoped>
.tree-container{
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 15px;
}
.item{
  width: 100%;
}
.btn{
  width: 80%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  cursor: pointer;
  border-radius: 5px;
}
.btn:hover{
  background-color: #e0e0e0;
}

</style>
