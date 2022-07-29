<template>
  <div class="container mx-auto min-h-[60vh] w-full">
    <div v-show="err"
         class="inset-x-0 inline-flex items-center w-full px-6 py-5 mb-3 text-base text-yellow-700 bg-yellow-100 rounded-lg"
         role="alert">
      <svg aria-hidden="true"
           focusable="false"
           data-prefix="fas"
           data-icon="exclamation-triangle"
           class="w-10 h-10 mr-2 fill-current sm:w-4 sm:h-4"
           role="img"
           xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 576 512">
        <path fill="currentColor"
              d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z">
        </path>
      </svg>
      It looks like you're having a problem with your internet connection.
      Please refresh the page
    </div>

    <router-link to="/">
      <span
            class="flex items-center mb-2 ml-10 hover:text-gray-500 md:text-2xl">
        <font-awesome-icon icon="fa-solid fa-square-caret-left"
                           class="mr-1" />
        <p>Back</p>
      </span>
    </router-link>

    <div class="container mx-auto min-h-[60vh] p-8">
      <div class="relative grid grid-cols-1 gap-x-14 md:grid-cols-2">
        <section class="mt-4">
          <h2 class="text-2xl font-semibold text-gray-900">Upcoming Meetings
          </h2>

          <div v-if="reservations.length !== 0 && !emptyResult">
            <div v-for="(reservation, index) in reservations"
                 :key="index">
              <ol
                  class="mt-2 text-sm leading-6 text-gray-500 divide-y divide-gray-200">
                <li class="py-4">
                  <p class="flex-none text-lg font-bold w-28">
                    {{ reservation.name }}</p>
                  <p class="flex-none mt-2 w-28">Meeting title</p>
                  <p class="flex-auto font-semibold text-gray-900 sm:mt-0">
                    {{ reservation.meeting_title }}</p>

                  <p class="flex-none mt-2"
                     v-for="slot in reservation.slots"
                     :key="slot">

                    <time>{{ slot }}</time>
                  </p>
                </li>
              </ol>
            </div>
          </div>
          <div v-else-if="emptyResult">
            <p class="mt-4 text-gray-600 capitalize">no reservations found for this day</p>
          </div>
          <div v-else
               class="min-h-[40vh] grid place-content-center">
            <AppLoader />
          </div>

        </section>

      </div>
    </div>
  </div>
</template>

<script>
import getReservationsOfSpecificDay from '../composables/getReservationsOfSpecificDay';
import AppLoader from '@/components/AppLoader.vue';
import { ref } from 'vue'
import { useRoute } from 'vue-router';

export default {
  components: { AppLoader },
  setup() {

    let err = ref(false);
    const route = useRoute();

    const { reservations, emptyResult, load, error } = getReservationsOfSpecificDay(route.params.date);
    const slotsArr = ref([]);
    load();

    // display error message
    setTimeout(() => {
      if (!reservations) {
        err.value = true;
      } 
    }, 10000);
    
    return { reservations, error, emptyResult, slotsArr, err }
  }
}
</script>