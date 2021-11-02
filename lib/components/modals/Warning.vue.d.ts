declare const _default: import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
        required: true;
    };
    text: {
        type: StringConstructor;
        required: true;
    };
    isDisplayed: {
        type: BooleanConstructor;
        required: true;
    };
    color: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    leftButton: {
        type: StringConstructor;
        required: false;
    };
    rightButton: {
        type: StringConstructor;
        required: false;
    };
    isLoading: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}, {
    rightButtonClicked: () => void;
    leftButtonClicked: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("leftButtonClicked" | "rightButtonClicked")[], "leftButtonClicked" | "rightButtonClicked", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    title?: unknown;
    text?: unknown;
    isDisplayed?: unknown;
    color?: unknown;
    leftButton?: unknown;
    rightButton?: unknown;
    isLoading?: unknown;
} & {
    title: string;
    text: string;
    isDisplayed: boolean;
    color: string;
    isLoading: boolean;
} & {
    leftButton?: string | undefined;
    rightButton?: string | undefined;
}> & {
    onLeftButtonClicked?: ((...args: any[]) => any) | undefined;
    onRightButtonClicked?: ((...args: any[]) => any) | undefined;
}, {
    color: string;
    isLoading: boolean;
}>;
export default _default;
