export declare type sideBarState<T> = {
    state: 'edit';
    entity: T;
} | {
    state: 'list';
} | {
    state: 'new';
} | {
    state: 'hide';
} | {
    state: 'search';
};
