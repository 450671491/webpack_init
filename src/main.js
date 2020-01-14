import Vue from 'vue'
import App from './app'
import test from './components/test/index'
Vue.use(test);
new Vue({
  render: h => h(App)
}).$mount('#app')