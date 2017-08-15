import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import goods from '../components/goods/goods'
import ratings from '../components/ratings/ratings'
import sellers from '../components/sellers/sellers'

Vue.use(Router)
Vue.use(VueResource);

export default new Router({
   linkActiveClass:'active',
  routes: [
    {
     path:'/',
     component:goods
    },
    {
     path:'/goods',
     component:goods
    },
    {
     path:'/sellers',
     component:sellers
    },
    {
     path:'/ratings',
     component:ratings
    },
  ]
});

