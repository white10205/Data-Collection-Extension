<template>
  <div class="container">
    <van-cell-group inset>
      <van-field
        v-model="links"
        type="textarea"
        label="笔记链接"
        rows="10"
        autosize
        :rules="[{ required: true }]"
        placeholder="可输入多个笔记链接,请换行分隔"
        style="border: 2px solid #ff0000;"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" @click="start"> 开始采集 </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showToast } from "vant";

const props = defineProps<{
  submit: (urls: string[]) => void;
}>();
const links = ref<string>("");

const start = () => {
  const users = links.value.split(/\r?\n/);
  for (let user of users) {
    if (!isValidXHSProfileUrl(user)) {
      showToast("请输入正确的小红书笔记链接！！");
      return;
    }
  }
  props.submit(users);
};

// 是否为合法的博主链接
function isValidXHSProfileUrl(url: string) {
  const profilePattern = /^https:\/\/www\.xiaohongshu\.com\/user\/profile\/[a-zA-Z0-9]+(\?[^ ]*)?$/;
  const notePattern = /^https:\/\/www\.xiaohongshu\.com\/explore\/[a-zA-Z0-9]+\?xsec_token=[^&]+(&xsec_source=[^&]+)?$/;
  return profilePattern.test(url) || notePattern.test(url);
}
</script>

<style scoped></style>
