<template>
  <div class="container">
    <van-cell-group inset>
      <van-field
        v-model="links"
        type="textarea"
        label="博主链接"
        rows="10"
        autosize
        :rules="[{ required: true }]"
        placeholder="可输入多个博主链接,请换行分隔"
      />
      <van-field
        v-model="num"
        type="number"
        label="导出数量"
        :rules="[{ required: true }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" @click="start">
        开始采集
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showToast } from 'vant';

const props = defineProps<{
  submit: any;
}>();
const links = ref<string>('');
const num = ref(10);

const start = () => {
  const users = links.value.split(/\r?\n/);
  for (let user of users) {
    if (!isValidXHSProfileUrl(user)) {
      showToast('检测到非法的博主链接，请确保博主链接正确');
      return;
    }
  }
  props.submit(users);
};

// 是否为合法的博主链接
function isValidXHSProfileUrl(url: string) {
  return /^https:\/\/www\.xiaohongshu\.com\/user\/profile\/[a-zA-Z0-9]+(\?[^ ]*)?$/.test(
    url
  );
}
</script>

<style scoped></style>
