import Vue from 'vue'
import App from './App.vue'
import config from './utils/config';
import request from './utils/request';
import mixin from './mixin/index';
import { Picker, Toast, Button, Field, DatetimePicker, Popup } from 'vant';

Vue.use(Picker);
Vue.use(Toast);
Vue.use(Button);
Vue.use(Field);
Vue.use(DatetimePicker);
Vue.use(Popup);

Vue.mixin(mixin);
Vue.config.productionTip = false
Vue.prototype.$config = config;
Vue.prototype.$request = request;
Vue.prototype.$toast = Toast;
new Vue({
  render: h => h(App),
}).$mount('#app')
