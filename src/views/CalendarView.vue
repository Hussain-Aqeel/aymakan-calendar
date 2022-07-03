<template>
  <app-wrapper>
    <div class="container mx-auto min-h-[60vh] w-full">

      <router-link to="/">
        <span
              class="flex items-center hover:text-gray-500 md:text-2xl ml-10 mb-10">
          <font-awesome-icon icon="fa-solid fa-square-caret-left"
                             class="mr-1" />
          <p>Back</p>
        </span>
      </router-link>

      <div v-if="reservations">
        <div v-if="reservations.length !== 0">
          <h1 class="text-3xl font-bold ml-9">Reservations</h1>
          <div v-for="(reservation, index) in reservations"
               :key="index">
            <div class="p-3 m-5 ml-9 bg-amber-300 rounded-lg text-xl w-4/5">
              <h2 class="text-xl font-bold m-2">Name: {{ reservation.name }}
              </h2>
              <p class="m-2">Email: {{ reservation.email }}</p>
              <p class="font-bold m-2">Date: {{ reservation.date }}</p>
              <p class="m-2">Reserved time slots:</p>
              <div v-for="slot in reservation.slots"
                   :key="slot"
                   class="grid grid-cols-3 text-center">
                <span class="inline px-3 py-2 m-3 bg-white rounded-full">
                  {{ slot }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <clip-loader></clip-loader>
        </div>
      </div>
      <div v-else>
        <p>No reservations are found</p>
      </div>
    </div>
  </app-wrapper>

</template>

<script>
import AppWrapper from '../components/AppWrapper.vue'
import getReservations from '../composables/getReservations';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import { ref } from 'vue'

export default {
  components: { AppWrapper, ClipLoader },
  setup() {
    const { reservations, load, error } = getReservations();
    const slotsArr = ref([]);
    load();

    return { reservations, error, slotsArr }

  }
}
</script>

<style>

</style>