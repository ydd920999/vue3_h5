import { createApp } from 'vue';
import App from './App.vue';
import 'normalize.css';
import { setupRouter, router } from '@/router';
import { setupStore } from './pinia';
import 'vant/es/toast/style';
import 'vant/es/notify/style';

const app = createApp(App);
setupRouter(app);
setupStore(app);

router.isReady().then(() => app.mount('#app'));
