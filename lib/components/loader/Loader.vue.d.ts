declare const _default: import("vue").DefineComponent<{
    isLoading: {
        type: BooleanConstructor;
        required: true;
        default: boolean;
    };
    size: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    color: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    isLoading?: unknown;
    size?: unknown;
    color?: unknown;
} & {
    isLoading: boolean;
    size: string;
    color: string;
} & {}>, {
    size: string;
    color: string;
}>;
export default _default;
