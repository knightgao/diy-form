<script setup lang="ts">
import { computed, watch } from "vue";
import { useDynamicForm } from "./useCurrentComponent";
import { v4 as uuidv4 } from 'uuid';
import BaseForm from "./base-form.vue";


const { handleAdd, config, getValue, curryValue } = useDynamicForm()

// 定义抛出的值
const emit = defineEmits<{
    arrayValue: [rest: string[]]
    value: []
}>()



// 处理数组格式的返回
const arrayValue = computed(
    () => getValue()
)

watch([curryValue, config], () => {
    emit("arrayValue", arrayValue.value);
})



</script>
<template>
    <div class="DynamicForm">

        <BaseForm :curry-value="curryValue" :config="config"></BaseForm>

        <div>
            <button @click="handleAdd({
                type: 'text',
                key: uuidv4()
            }, 0)">新增个text</button>

            <button @click="handleAdd({
                type: 'select',
                key: uuidv4(),
                selectOptions: [
                    {
                        value: 'jack',
                        label: 'Jack',
                    },
                    {
                        value: 'lucy',
                        label: 'Lucy',
                    },
                ]
            }, 0)">新增个select</button>

            <button @click="handleAdd({
                type: 'number',
                key: uuidv4()
            })">最后新增个number</button>
        </div>

        <div>
            {{ curryValue }}
        </div>

        <div>
            {{ getValue() }}
        </div>


    </div>
</template>
<style lang="scss" scoped>
.DynamicForm {}
</style>
