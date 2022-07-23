<template>
  <div class="container mx-auto min-h-[60vh] w-full">

    <router-link to="/">
      <span
            class="flex items-center hover:text-gray-500 md:text-2xl ml-10 mb-2">
        <font-awesome-icon icon="fa-solid fa-square-caret-left"
                           class="mr-1" />
        <p>Back</p>
      </span>
    </router-link>

    <div class="container mx-auto min-h-[60vh] p-8">
      <div class="relative grid grid-cols-1 gap-x-14 md:grid-cols-2">
        <section class="mt-4">
          <h2 class="text-2xl font-semibold text-gray-900">Upcoming Meetings</h2>
          <div v-if="reservations">
            <div v-if="reservations.length !== 0">
              <div v-for="(reservation, index) in reservations"
                   :key="index">
                <ol
                    class="mt-2 divide-y divide-gray-200 text-sm leading-6 text-gray-500">
                  <li class="py-4">
                    <p class="w-28 flex-none text-lg font-bold">{{ reservation.name }}</p>
                    <p class="w-28 flex-none mt-2">Meeting title</p>
                    <p
                       class="flex-auto font-semibold text-gray-900 sm:mt-0">
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
            <div v-else
                 class="min-h-[40vh] grid place-content-center">
              <AppLoader />
            </div>
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

    const route = useRoute();

    const { reservations, load, error } = getReservationsOfSpecificDay(route.params.date);
    const slotsArr = ref([]);
    load();

    return { reservations, error, slotsArr }
  }
}
</script>