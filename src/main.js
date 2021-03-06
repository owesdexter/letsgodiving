import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import {store} from './store/store';
import DatepickerLite from "vue3-datepicker-lite";
require('./assets/style/css/all.min.css');


createApp(App)
    .use(router)
    .use(store)
    .use(DatepickerLite)
    .mount('#app')



