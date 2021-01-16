import { createApp } from 'vue';
import router from './router';
import {store} from './store/store';
import App from './App.vue';
import DatepickerLite from "vue3-datepicker-lite";
require('./assets/style/css/all.min.css');


createApp(App)
    .use(router)
    .use(store)
    .use(DatepickerLite)
    // .use(Calendar)
    // .use(PrimeVue)
    // .use(vcalendar, {componentPrefix: 'vc',})  // Use <vc-calendar /> instead of <v-calendar />
    // .provide(state, createStore())
    .mount('#app')


