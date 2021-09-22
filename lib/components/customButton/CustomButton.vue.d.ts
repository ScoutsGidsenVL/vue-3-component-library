declare const _default: import("vue").DefineComponent<{
    text: {
        type: StringConstructor;
        required: true;
    };
    disabled: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    type: {
        type: StringConstructor;
        default: string;
        required: false;
    };
    isSubmitting: {
        type: BooleanConstructor;
        default: boolean;
        required: false;
    };
    hoverColor: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    extraStyle: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    text?: unknown;
    disabled?: unknown;
    type?: unknown;
    isSubmitting?: unknown;
    hoverColor?: unknown;
    extraStyle?: unknown;
} & {
    text: string;
    disabled: boolean;
    type: string;
    isSubmitting: boolean;
    hoverColor: string;
    extraStyle: string;
} & {}> & {}, {
    disabled: boolean;
    type: string;
    isSubmitting: boolean;
    hoverColor: string;
    extraStyle: string;
}>;
export default _default;
