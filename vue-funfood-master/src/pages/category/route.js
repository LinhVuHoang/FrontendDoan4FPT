import Applayout from "@/layout/Applayout";
const routes = [
    {
        path: '/categories',
        component: Applayout,
        name: 'categories',
        meta: {
            title: 'Categories',
            icon: 'menu-fold'
        },
        children: [
            {
                path: 'list',
                component: () => import('./ListCategory'),
                name: 'categoryList',
                meta: {
                    title: 'Categories List',
                }
            },

        ]
    },


]

export default routes;