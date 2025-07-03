import { createApp } from 'vue';
import App from './App.vue';
import { Switch, Button } from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css'
const app = createApp(App)
app.use(Switch).use(Button)
app.mount('#app');

