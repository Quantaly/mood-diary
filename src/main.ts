import Vue, { CreateElement } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

// have to do it like this otherwise typescript complains
const vueOptions = {
  router,
  vuetify,
  render: (h: CreateElement) => h(App)
};

new Vue(vueOptions).$mount('#app');
