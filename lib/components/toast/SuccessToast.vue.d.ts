declare const _default: import("vue").DefineComponent<{
    label: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}, {
    hideToast: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "hideToast"[], "hideToast", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    label?: unknown;
} & {
    label: string;
} & {}> & {
    onHideToast?: ((...args: any[]) => any) | undefined;
}, {
    label: string;
}>;
export default _default;
