import { Input, Select, InputNumber } from "ant-design-vue";
import { ref } from "vue";
import { v4 as uuidv4 } from 'uuid';
import type { SelectProps } from 'ant-design-vue';

interface BaseItem {
    key: string // 组件的唯一标识
    type: "text" | "select" | "number" | "slot"
    label?: string // 组件标签名
    description?: string // 组件的描述内容
    defaultValue?: any // 组件的默认值
    render?: Function // 自定义组件的渲染函数
    selectOptions?: SelectProps['options'] // 自定义组件的渲染函数
}

// 所有类型和组件映射关系
const typeMap: Record<string, unknown> = {
    "text": Input,
    "select": Select,
    "number": InputNumber,
};

// 当前组件
const currentComponent = (type: string) => {
    if (Object.keys(typeMap).includes(type)) {
        return typeMap[type];
    }
};


const useDynamicForm = () => {


    // 表单的配置
    const config = ref<Array<BaseItem>>([])


    // 当前的数值
    const curryValue = ref<Record<string, any>>({})


    // 数组形式返回结果
    const getValue = (): Array<string> => {
        return config.value.map((i) => {
            return curryValue.value[i.key] ?? ''
        })
    }

    // 按钮
    const handleAdd = (param: BaseItem | Function = { key: uuidv4(), type: "text" }, index: number = -1) => {
        const newParam = typeof param === 'function' ? Object.assign({
            key: uuidv4(),
            type: "text"
        }, param()) : Object.assign({
            key: uuidv4(),
            type: "text"
        }, { ...param })

        if (index !== -1) {
            config.value.splice(index, 0, { ...newParam });
        } else {
            config.value.push({ ...newParam })
        }
    }
    return { currentComponent, handleAdd, config, getValue, curryValue }
}

export { useDynamicForm, currentComponent, typeMap }
export type { BaseItem }