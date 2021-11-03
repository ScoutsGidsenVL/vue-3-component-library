import { RouteLocationNormalizedLoaded, Router } from 'vue-router';
import { PropType } from 'vue';
export interface breadcrumb {
    crumb?: string;
    uuid?: string;
}
declare const _default: import("vue").DefineComponent<{
    home: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    route: {
        type: PropType<RouteLocationNormalizedLoaded>;
        required: true;
    };
    router: {
        type: PropType<Router>;
        required: true;
    };
    isInternetActive: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}, {
    route: RouteLocationNormalizedLoaded;
    breadcrumbs: import("vue").Ref<{
        crumb?: string | undefined;
        uuid?: string | undefined;
    }[]>;
    navigateHome: () => void;
    navigateToCrumb: (selectedBreadcrumb: breadcrumb) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    home?: unknown;
    route?: unknown;
    router?: unknown;
    isInternetActive?: unknown;
} & {
    home: string;
    route: RouteLocationNormalizedLoaded;
    router: Router;
    isInternetActive: boolean;
} & {}> & {}, {
    home: string;
    isInternetActive: boolean;
}>;
export default _default;
