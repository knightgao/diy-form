import { Input, Select, InputNumber } from "ant-design-vue";
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
export { currentComponent }