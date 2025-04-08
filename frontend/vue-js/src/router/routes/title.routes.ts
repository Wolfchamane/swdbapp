export const TITLE_DETAILS_ROUTE = {
    name: 'title-details-view',
    path: '/titles/:id',
    // @ts-expect-error import
    component: async () => await import('@/views/title-details/title-details-view.vue'),
};
