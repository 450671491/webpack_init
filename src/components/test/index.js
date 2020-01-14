import test from './test'
export default {
  install: (Vue) => {
    Vue.component('test', test())
  }
}