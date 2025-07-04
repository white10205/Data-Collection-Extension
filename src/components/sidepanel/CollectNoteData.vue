<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="formData.keyword"
        name="keyword"
        label="关键词"
        placeholder="请输入"
        :rules="[{ required: true, message: '请填写关键词' }]"
      />
      <van-field
        v-model="formData.num"
        name="num"
        label="数量"
        placeholder="一次性导出的数量"
        :rules="[{ required: true, message: '请填写数量' }]"
      />
      <!-- <van-field
        name="checkboxGroup"
        label="笔记类型"
        :rules="[{ required: true, message: '至少选择一种要导出的类型' }]"
      >
        <template #input>
          <van-checkbox-group v-model="formData.type" direction="horizontal">
            <van-checkbox name="1" shape="square">图片</van-checkbox>
            <van-checkbox name="2" shape="square">视频</van-checkbox>
          </van-checkbox-group>
        </template>
      </van-field> -->
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        开始采集
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
const props = defineProps<{
  submit: (keyword: string, num: number, type: string[]) => {};
}>();

const formData = ref({
  keyword: '',
  num: 200,
  type: [],
});

const onSubmit = () => {
  props.submit(formData.value.keyword, formData.value.num, formData.value.type);
};
</script>
