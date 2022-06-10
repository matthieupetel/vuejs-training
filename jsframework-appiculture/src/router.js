import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: () => import('./components/front/Homepage'),
            meta: {activeIndex: "1"}
        },
        {
            path: '/visite/:id',
            name: 'visite',
            component: () => import('./components/front/Visite'),
            meta: {activeIndex: "1-1"}
        },
        {
            path: '/carte',
            name: 'carte',
            component: () => import('./components/front/Map'),
            meta: {activeIndex: "2"}
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('./components/admin/Admin'),
            children: [
                {
                    path: 'configuration',
                    name: 'configuration',
                    component: () => import('./components/admin/ConfigurationGlobal'),
                    meta: {activeIndex: "3-1"}
                },
                {
                    path: 'ruchers',
                    name: 'ruchers',
                    component: () => import('./components/admin/ConfigurationRuchers'),
                    meta: {activeIndex: "3-2"}
                }
            ]
        }
    ]
})
