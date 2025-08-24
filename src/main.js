import { createApp } from 'vue';
import './style.css';
import './assets/base.css';
import './assets/tailwind.css';
import App from './App.vue';
import router from './router';
import Admin from './layout/wrapper/Admin/index.vue';
import Client from './layout/wrapper/Client/index.vue';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';

const app = createApp(App);
app.use(router);
app.component("admin-layout", Admin);
app.component("client-layout", Client);
app.mount("#app");
