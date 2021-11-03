import { InputTypes } from '../../enums/inputTypes';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: ArrayConstructor;
        required: false;
        default: () => never[];
    };
    name: {
        type: StringConstructor;
        required: true;
    };
    label: {
        type: StringConstructor;
        required: true;
    };
    type: {
        type: StringConstructor;
        required: false;
        default: InputTypes;
    };
    value: {
        type: StringConstructor;
        default: string;
    };
    rules: {
        type: (StringConstructor | ObjectConstructor | FunctionConstructor)[];
        default: string;
        required: false;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    min: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    maxlength: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    extraInfo: {
        type: StringConstructor;
        required: false;
    };
    hideInput: {
        type: BooleanConstructor;
        default: boolean;
        required: false;
    };
    loadingSubmit: {
        type: BooleanConstructor;
        default: boolean;
        required: false;
    };
    onInvalid: {
        type: StringConstructor;
        default: string;
        required: false;
    };
    textAreaWidth: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    placeholder: {
        type: StringConstructor;
        required: false;
    };
    step: {
        type: StringConstructor;
        required: false;
    };
    isSubmitting: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}, {
    InputTypes: typeof InputTypes;
    inputValue: import("vue").Ref<string>;
    emitValue?: undefined;
} | {
    InputTypes: typeof InputTypes;
    emitValue: () => void;
    inputValue?: undefined;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    name?: unknown;
    label?: unknown;
    type?: unknown;
    value?: unknown;
    rules?: unknown;
    disabled?: unknown;
    min?: unknown;
    maxlength?: unknown;
    extraInfo?: unknown;
    hideInput?: unknown;
    loadingSubmit?: unknown;
    onInvalid?: unknown;
    textAreaWidth?: unknown;
    placeholder?: unknown;
    step?: unknown;
    isSubmitting?: unknown;
} & {
    name: string;
    modelValue: unknown[];
    label: string;
    type: string;
    value: string;
    rules: string | Function | Record<string, any>;
    disabled: boolean;
    min: string;
    maxlength: string;
    hideInput: boolean;
    loadingSubmit: boolean;
    onInvalid: string;
    textAreaWidth: string;
    isSubmitting: boolean;
} & {
    extraInfo?: string | undefined;
    placeholder?: string | undefined;
    step?: string | undefined;
}> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: unknown[];
    type: string;
    value: string;
    rules: string | Function | Record<string, any>;
    disabled: boolean;
    min: string;
    maxlength: string;
    hideInput: boolean;
    loadingSubmit: boolean;
    onInvalid: string;
    textAreaWidth: string;
    isSubmitting: boolean;
}>;
export default _default;
