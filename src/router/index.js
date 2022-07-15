import { createRouter, createWebHistory } from 'vue-router';
import ReserveView from '../views/ReserveView.vue';
import ReservationView from '../views/ReservationView.vue';
import SingleReservationView from '../views/SingleReservationView.vue';
import SlotsView from '../views/SlotsView.vue';
import WelcomeView from '../views/WelcomeView.vue';
// import CalendarView from '../views/CalendarView.vue';
import NewCalendarView from '../views/NewCalendarView.vue'
import ErrorView from '../views/ErrorView.vue';
import SuccessfulReservationView from '../views/SuccessfulReservationView.vue';

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
    component: NewCalendarView,
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
    path: '/reservations/:id',
    name: 'modifyReservation',
    component: SingleReservationView,
    props: true,
  },
  {
    path: '/slots',
    name: 'slots',
    component: SlotsView,
    meta: { transitionName: 'slide' },
    props: route => ({ query: route.query.date })
  },
  {
    path: '/error',
    name: 'error',
    component: ErrorView,
  },
  {
    path: '/successful',
    name: 'success',
    component: SuccessfulReservationView
  },
  // will match everything and put it under `$route.params.pathMatch`
  { 
    path: '/:pathMatch(.*)*', 
    name: 'error', 
    component: ErrorView 
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
