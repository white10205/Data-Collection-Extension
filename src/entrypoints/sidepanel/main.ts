import { createApp } from 'vue';
import App from './App.vue';
import {
  Form,
  Field,
  CellGroup,
  Switch,
  Button,
  CheckboxGroup,
  Checkbox,
} from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';
const app = createApp(App);
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(Switch).use(Button).use(CheckboxGroup).use(Checkbox);
app.mount('#app');
