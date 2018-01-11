// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { mapActions } from "vuex";
import '_CFG_/global'
import '_CSS_/reset.scss';

Vue.config.productionTip = false
/* eslint-disable no-new */
function vueInit(){
  new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
  });
}

(function() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js?v=2').then(registration => {
        console.log('SW registered: ', registration);
        //registration.pushManager.subscribe({ userVisibleOnly: true });
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }
  store.dispatch('user/login').then(()=>{
    vueInit();
  })
})();