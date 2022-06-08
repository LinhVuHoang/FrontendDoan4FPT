import Applayout from "@/layout/Applayout";

const routes = [
    {
        path: '/accounts',
        component: Applayout,
        name: 'account',
        meta: {
            title: 'User',
            icon: 'team'
        },
        children: [
           /* {
                path: 'list',
                component: () => import('./List'),
                name: 'accountList',
                meta: {
                    title: 'List',
                }
            },*/
            {
                path: 'list',
                component: () => import('./List'),
                name: 'accountForm',
                meta: {
                    title: 'List',
                }
            },
           /* {
                path: 'edit/:id',
                component: () => import('./Detail'),
                name: 'accountEdit',
                meta: {
                    title: 'Detail',
                    hidden: true
                }
            },*/

        ]
    }
]

export default routes;