import { createRouter, createWebHistory } from 'vue-router';
import ReserveView from '../views/ReserveView.vue';
import ReservationView from '../views/ReservationView.vue';
import ModifyReservationView from '../views/ModifyReservationView.vue';
import SlotsView from '../views/SlotsView.vue';
import WelcomeView from '../views/WelcomeView.vue';
import CalendarView from '../views/CalendarView.vue';

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: WelcomeView
  },
  {
    path: '/reserve',
    name: 'reserve',
    component: ReserveView,
    meta: { transitionName: 'slide' },
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: CalendarView,
    meta: { transitionName: 'slide' },
  },
  {
    path: '/reservation',
    name: 'reservation',
    component: ReservationView,
    meta: { transitionName: 'slide' },
    props: route => ({
      query: route.query.date,
      room: route.query.room,
      // time: route.query.time
    })
  },
  {
    path: '/reservation/:id',
    name: 'modifyReservation',
    component: ModifyReservationView
  },
  {
    path: '/slots',
    name: 'slots',
    component: SlotsView,
    meta: { transitionName: 'slide' },
    props: route => ({ query: route.query.date })
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if(savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 }
  }
})

export default router
