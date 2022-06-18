<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/reservation">Reservation</router-link> |
    <router-link to="/slots">Slots</router-link>
  </nav>
  <router-view></router-view>
</template>

<!-- <script>
import getReservations from './composables/getReservations'
export default {
  setup() { 

    const { reservations, error, load } = getReservations();

    load();

    return { reservations, error }
  }
  
  
  }
</script> -->
<style>

</style>
