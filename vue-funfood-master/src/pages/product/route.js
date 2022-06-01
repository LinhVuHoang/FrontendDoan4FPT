import Applayout from "@/layout/Applayout";
const routes = [
    {
        path: '/',
        component: Applayout,
        name: 'products',
        meta: {
            title: 'Products',
            icon: 'bars'
        },
        children: [
            {
                path: 'products/list',
                component: () => import('./List'),
                name: 'productList',
                meta: {

                    title: 'Products List',
                }
            },
            {
                path: 'products/create',
                component:()=> import('./Created'),
                name:'createProduct',
                meta: {
                    title: 'Create Product'
                }
            },
            {
                path: 'products/detail/:id',
                component:()=> import('./Detail'),
                name:'detailProduct',
                meta: {
                    title: 'Detail Product',
                    hidden: 'true'
                }
            },
            {
                path: 'products/edit/:id',
                component:()=> import('./edit'),
                name:'editProduct',
                meta: {
                    title: 'Edit Product',
                    hidden:'true'
                }
            },
        ]
    },


]

export default routes;