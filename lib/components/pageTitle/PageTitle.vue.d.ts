declare const _default: import("vue").DefineComponent<{
    title: {
        required: true;
        type: StringConstructor;
    };
    homeUrl: {
        required: true;
        type: StringConstructor;
    };
}, {
    home: (url: any) => string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    title?: unknown;
    homeUrl?: unknown;
} & {
    title: string;
    homeUrl: string;
} & {}>, {}>;
export default _default;
