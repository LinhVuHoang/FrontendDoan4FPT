import Vue from 'vue'
import VueRouter from 'vue-router'
import {productsRoute} from "@/pages/product";
import {categoriesRoute} from "@/pages/category";
import {ordersRouter} from "../pages/order";
import {accountsRoute} from "../pages/account";
import {loginsRoute} from "../pages/login";

Vue.use(VueRouter)

const routes = [
    ...accountsRoute,
    ...productsRoute,
    ...categoriesRoute,
    ...ordersRouter,
    ...loginsRoute



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