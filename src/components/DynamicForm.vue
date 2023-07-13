<script setup lang="ts">
import { ref, watch } from "vue";
import { currentComponent } from "./useCurrentComponent";

interface BaseItem {
    key: string // 组件的唯一标识
    type: "text" | "select" | "number" | "slot"
    label?: string // 组件标签名
    description?: string // 组件的描述内容
    defaultValue?: any // 组件的默认值
    render?: Function // 自定义组件的渲染函数
}

// 表单的配置
const config = ref<Array<BaseItem>>([{
    key: "name",
    type: "text"
}])


// 当前的数值
const curryValue = ref<Record<string, any>>({})

// 定义抛出的值
const emit = defineEmits<{
    arrayValue: [rest: string[]]
    value: []
}>()


// 数组形式返回结果
const getValue = (): Array<string> => {
    return config.value.map((i) => {
        return Object.prototype.toString.call(curryValue.value[i.key]) ?? ''
    })
}

watch([curryValue, config], () => {
    emit("arrayValue", getValue());
})



</script>
<template>
    <div class="DynamicForm">
        <template v-for="item in config">
            <template v-if="item.type !== 'slot'">
                <component :is="currentComponent(item.type)" v-model:value="curryValue[item.key]"></component>
            </template>
            <template v-if="item.type === 'slot'">
                这里是渲染函数
            </template>
        </template>
        {{ curryValue }}
    </div>
</template>
<style lang="scss" scoped>
.DynamicForm {}
</style>
