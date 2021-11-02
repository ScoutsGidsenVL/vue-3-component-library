import { ComputedRef, Ref } from 'vue';
export declare const scrollToFirstError: (validation: any, container: string) => void;
export declare const useScrollToTop: () => {
    formDiv: Ref<HTMLDivElement | undefined>;
    scrollToTop: () => void;
    scrollToTopOfPage: () => void;
};
export declare type formMeta<T> = ComputedRef<{
    dirty: boolean;
    touched: boolean;
    valid: boolean;
    pending: boolean;
    initialValues: T;
}>;
export declare const useFormSendWithSuccess: <T>(meta: formMeta<T>) => {
    formSendWithSuccess: Ref<boolean>;
};
