import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
        required: true;
    };
    isDisplay: BooleanConstructor;
    selection: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    options: {
        type: PropType<String[]>;
        required: false;
    };
    width: {
        type: StringConstructor;
        default: string;
        required: false;
    };
    isEdit: BooleanConstructor;
    name: StringConstructor;
    isOverflowHidden: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}, {
    hideSideBar: () => void;
    emitOption: () => void;
    selected: import("vue").Ref<string>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    title?: unknown;
    isDisplay?: unknown;
    selection?: unknown;
    options?: unknown;
    width?: unknown;
    isEdit?: unknown;
    name?: unknown;
    isOverflowHidden?: unknown;
} & {
    title: string;
    isDisplay: boolean;
    selection: string;
    width: string;
    isEdit: boolean;
    isOverflowHidden: boolean;
} & {
    options?: String[] | undefined;
    name?: string | undefined;
}> & {}, {
    isDisplay: boolean;
    selection: string;
    width: string;
    isEdit: boolean;
    isOverflowHidden: boolean;
}>;
export default _default;
