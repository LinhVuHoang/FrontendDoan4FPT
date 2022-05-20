import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import CKEditor from 'ckeditor4-vue'

Vue.use(Antd);


Vue.config.productionTip = false

Vue.use( CKEditor );


new Vue({
  render: h => h(App),
  router
}).$mount('#app')