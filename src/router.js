import Vue from 'vue'
import Router from 'vue-router'
import Restaurants from './views/Restaurants.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/restaurants',
      name: 'restaurants',
      component: Restaurants
    }
  ]
})
