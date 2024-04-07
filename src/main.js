// src/main.js
import { createApp } from 'vue'; // Import từ 'vue'

import App from './App.vue';
import PrimeVue from 'primevue/config';
import router from './router';

createApp(App).use(router).use(PrimeVue).mount('#app');
