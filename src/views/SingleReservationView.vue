<template>
  <div class="container mx-auto min-h-[60vh]">
    <div v-if="reservation">
      <div class="ml-10">
        <h2 class="text-2xl md:text-3xl mb-5 font-bold">
          <span>
            <font-awesome-icon icon="fa-solid fa-calendar-week" />
          </span>
          Reservation Details
        </h2>
        <ol
            class="mt-2 divide-y divide-gray-200 text-sm leading-6 text-gray-500">
          <li class="py-4">
            <p class="w-28 flex-none text-lg font-bold">{{ reservation.name }}
            </p>
            <p class="w-28 flex-none mt-2">Meeting title</p>
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
      <div class="m-4 w-full flex flex-col md:flex-row">
        <button type="button"
                class="inline-block w-32 py-2 px-3 bg-emerald-500 hover:bg-emerald-400 duration-200 text-white font-bold text-md rounded-lg">
                Edit
        </button>
        <button type="button"
                class="inline-block w-32 py-2 px-3 md:ml-3 mt-3 bg-red-700 hover:bg-red-800 duration-200 text-white text-md font-bold rounded-lg"
                data-bs-toggle="modal"
                data-bs-target="#modal">
          Delete
        </button>
      </div>
    </div>
    <div v-else
         class="
         min-h-[40vh]
         grid
         place-content-center">
      <AppLoader />
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
       id="modal"
       tabindex="-1"
       aria-labelledby="deleteModal"
       aria-modal="true"
       role="dialog">
    <div
         class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
      <div
           class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
        <div
             class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
          <h5 class="text-xl font-medium leading-normal text-gray-800"
              id="exampleModalScrollableLabel">
            Are you sure you want to delete your reservation?
          </h5>
          <button type="button"
                  class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  data-bs-dismiss="modal"
                  aria-label="Close"></button>
        </div>
        <div class="modal-body relative p-4">
          <p>If you delete your reservation you can't be in the reservation
            room and you have to reserve again. a confirmation delete message
            will be sent to your email.</p>
        </div>
        <div
             class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
          <button type="button"
                  class="inline-block px-6 py-2.5 bg-amber-600 text-white font-medium uppercase rounded hover:bg-amber-700 hover:shadow-lg focus:bg-amber-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out"
                  data-bs-dismiss="modal">
            Close
          </button>
          <button type="button"
                  class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                  @click="handleDelete()">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getSingleReservation from '../composables/getSingleReservation';
import { useRoute, useRouter } from 'vue-router';
import AppLoader from '@/components/AppLoader.vue';
import { appFirestore } from '../firebase/config';

export default {
  components: { AppLoader },
  setup() {

    const route = useRoute();
    const router = useRouter();
    const { reservation, load, error } = getSingleReservation(route.params.id);

    load();

    const handleDelete = async () => {
      await appFirestore.collection('reservations').doc(route.params.id).delete();

      // redirect to homepage
      router.push('/');
    }

    return {
      handleDelete,
      reservation,
      error
    }
  }
}
</script>

<style>
.info-block {
  @apply mb-3 p-2;
}
</style>