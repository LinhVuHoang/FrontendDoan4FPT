import Vue from 'vue'
import VueRouter from 'vue-router'
import {productsRoute} from "@/pages/product";
import {categoriesRoute} from "@/pages/category";
import {ordersRouter} from "../pages/order";


Vue.use(VueRouter)

const routes = [
    ...productsRoute,
    ...categoriesRoute,
    ...ordersRouter



]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
})

export default router;