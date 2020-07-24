import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import EntryView from '../views/EntryView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:date',
    name: 'Entry',
    component: EntryView
  }
];

const router = new VueRouter({
  routes
});

export default router;
