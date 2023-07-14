<script setup lang="ts">
import { currentComponent, typeMap } from "./useCurrentComponent";
import { FormItem, Form } from "ant-design-vue";
import type { BaseItem } from "./useCurrentComponent";


const { config = [], curryValue = {} } = defineProps({
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
    }
})

</script>
<template>
    <Form>
        <template v-for="item in config">
            <FormItem>
                <template v-if="item.type !== 'slot'">
                    <component :key="item.key" :is="currentComponent(item.type)" v-model:value="curryValue[item.key]"
                        :options="item.selectOptions"></component>
                </template>
                <template v-if="item.type === 'slot'">
                    这里是渲染函数
                </template>
            </FormItem>
        </template>
    </Form>
</template>
<style lang="scss" scoped>
.base-form {}
</style>
