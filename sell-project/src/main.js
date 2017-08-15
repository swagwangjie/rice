import Vue from 'vue'
import App from './App'
import router from './router'

// import VueRouter from 'vue-router'
// import goods from './components/goods/goods'
// import ratings from './components/ratings/ratings'
// import sellers from './components/sellers/sellers'




new Vue({
  el: '#app',
  router,
  // components: { App },
  render:h =>h(App),
  // 第一步 创建一个名为eventHub 的空vue对象进行事件的派发与接受
  data: {
    eventHub: new Vue()
  }
  
})
