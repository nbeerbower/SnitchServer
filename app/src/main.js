import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);

import axios from 'axios';
import VueAxios from 'vue-axios';
app.use(VueAxios, axios);

import 'bootstrap/dist/css/bootstrap.min.css'
//import 'bootstrap/dist/js/bootstrap.min.js'

app.mount('#app');
