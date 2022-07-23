import { createRouter, createWebHistory } from 'vue-router';
import ReserveView from '../views/ReserveView.vue';
import ReservationView from '../views/ReservationView.vue';
import SingleReservationView from '../views/SingleReservationView.vue';
import SlotsView from '../views/SlotsView.vue';
import WelcomeView from '../views/WelcomeView.vue';
import CalendarView from '../views/CalendarView.vue';
import ErrorView from '../views/ErrorView.vue';
import SuccessfulReservationView from '../views/SuccessfulReservationView.vue';
import MeetingsOfSpecificDayView from '../views/MeetingsOfSpecificDayView.vue'; 

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: WelcomeView,
    meta: {
      title: 'Aymakan reservation system',
      transitionName: 'slide'
    },
  },
  {
    path: '/reserve',
    name: 'reserve',
    component: ReserveView,
    meta: { 
      title: 'reserve',
      transitionName: 'slide' 
    },
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: CalendarView,
    meta: {
      title: 'calendar',
      transitionName: 'slide'
    },
  },
  {
    path: '/reservation',
    name: 'reservation',
    component: ReservationView,
    meta: {
      title: 'reservation',
      transitionName: 'slide'
    },
    props: route => ({
      query: route.query.date,
      room: route.query.room,
    })
  },
  {
    path: '/reservations/:id',
    name: 'modifyReservation',
    component: SingleReservationView,
    meta: {
      title: 'reservation',
      transitionName: 'slide'
    },
    props: true,
  },
  {
    path: '/slots',
    name: 'slots',
    component: SlotsView,
    meta: {
      title: 'time slots',
      transitionName: 'slide'
    },
    props: route => ({ query: route.query.date })
  },
  {
    path: '/calendar/:date',
    name: 'specificDayReservations',
    component: MeetingsOfSpecificDayView,
    meta: {
      title: 'calendar',
      transitionName: 'slide'
    },
    props: true,
  },
  {
    path: '/error',
    name: 'error',
    meta: {
      title: 'error',
    },
    component: ErrorView,
  },
  {
    path: '/successful',
    name: 'success',
    meta: {
      title: 'success',
      transitionName: 'slide'
    },
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
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
});

export default router
