<script setup lang="ts">
import { h, ref } from "vue";
import { useDynamicForm } from "./useCurrentComponent";
import { v4 as uuidv4 } from 'uuid';
import BaseForm from "./base-form.vue";
import { TimePicker } from "ant-design-vue";


const { handleAdd, config, curryValue } = useDynamicForm()



config.value = [
    {
        key: 'name',
        type: 'text'
    },
    {
        key: 'age',
        type: 'text'
    },
    {
        key: 'area',
        type: 'text'
    }
]

const formData = ref([2, 16, 'shanghai'])



// 自定义组件
const handleAddSlot = () => {
    handleAdd({
        type: 'slot',
        key: uuidv4(),
        render: (props, { emit }) => {
            return h(TimePicker, {
                value: props.value,
                'onUpdate:value': (value: any) => {
                    console.log("改变值", value)
                    emit('update:value', value)
                },
            })
        }
    })
}


</script>
<template>
    <div class="DynamicForm">

        <BaseForm :curry-value="curryValue" :config="config" v-model:formData="formData"></BaseForm>

        <div>

            <button @click="handleAddSlot">新增个自定义组件</button>

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
            {{ formData }}
        </div>



    </div>
</template>