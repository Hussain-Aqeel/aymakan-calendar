import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ReservationView from '../views/ReservationView.vue';
import SlotsView from '../views/SlotsView.vue';

// function removeQueryParams(to) {
//   if (Object.keys(to.query).length)
//     return { path: to.path, query: {}, hash: to.hash }
// }

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/reservation',
    name: 'reservation',
    component: ReservationView,
    props: route => ({
      query: route.query.date,
      room: route.query.room,
      // time: route.query.time
    })

  },
  {
    path: '/slots',
    name: 'slots',
    component: SlotsView,
    props: route => ({ query: route.query.date })
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
