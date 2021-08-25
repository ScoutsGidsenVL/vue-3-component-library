import { PropType } from 'vue';
import { RouteLocationNormalizedLoaded, Router } from 'vue-router';
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
} & {
    home: string;
    route: RouteLocationNormalizedLoaded;
    router: Router;
} & {}> & {}, {
    home: string;
}>;
export default _default;
