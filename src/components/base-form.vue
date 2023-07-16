<script setup lang="ts">
import { currentComponent, getValue, typeMap } from "./useCurrentComponent";
import { FormItem, Form } from "ant-design-vue";
import type { BaseItem } from "./useCurrentComponent";
import { onMounted, unref, watch } from "vue";


const { config = [], curryValue = {}, formData = [] } = defineProps({
  config: {
    type: Array<BaseItem>,
    required: true,
    validator(value: Array<BaseItem>) {
      return value.every((item: BaseItem) => Object.keys(typeMap).includes(item.type))
    }
  },
  curryValue: {
    type: Object,
    required: true
  },
  formData: {
    type: Array,
    required: true,
  }
})

// 初始值的处理
const initForm = (formData: unknown[]) => {
  unref(formData).forEach(
    (item, index) => {
      if (config[index]) {
        curryValue[config[index].key] = item
      }
    }
  )
}

onMounted(() => {
  // 如果存在默认值再处理
  if (formData?.length > 0 && config.length > 0) {
    initForm(formData)
  }
})



// 定义抛出的值
const emit = defineEmits<{
  "update:formData": [rest: string[]]
}>()

watch([curryValue, config], () => {
  emit("update:formData", getValue(config, curryValue));
})




// 删除某项
const handleDel = (_item: BaseItem, index: number) => {
  config.splice(index, 1)
}

</script>
<template>
  <Form>
    <template v-for="(item, index) in config">
      <FormItem>
        <template v-if="item.type !== 'slot'">
          <component :key="item.key" :is="currentComponent(item.type)" v-model:value="curryValue[item.key]"
            :options="item.selectOptions"></component>
        </template>
        <template v-if="item.type === 'slot'">
          Todo:这里是渲染函数
        </template>
        <div @click="handleDel(item, index)" style="cursor: pointer;">删除</div>
      </FormItem>
    </template>
  </Form>
</template>
