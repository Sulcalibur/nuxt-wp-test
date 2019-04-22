import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';
import { createStore } from './store';

import http from './plugins/http';
Vue.use(http);

import Ripple from 'vue-ripple-directive';
Vue.directive('ripple', Ripple);

import webfontloader from './plugins/webfontloader';
webfontloader();

import './scss/app.scss';

export function createApp () {
  const router = createRouter();
  const store = createStore();

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  return { app, router, store };
}