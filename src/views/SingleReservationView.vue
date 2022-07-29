<template>
  <div class="container mx-auto min-h-[60vh]">
    <div v-if="reservation">
      <div class="ml-10">
        <h2 class="mb-5 text-2xl font-bold md:text-3xl">
          <span>
            <font-awesome-icon icon="fa-solid fa-calendar-week" />
          </span>
          Reservation Details
        </h2>
        <ol
            class="mt-2 text-sm leading-6 text-gray-500 divide-y divide-gray-200">
          <li class="py-4">
            <p class="flex-none text-lg font-bold w-28 md:text-xl">{{ reservation.name }}
            </p>
            <p class="flex-none mt-2 w-28">Meeting title</p>
            <p class="flex-auto font-semibold text-gray-900 sm:mt-0 md:text-lg">
              {{ reservation.meeting_title }}</p>

            <p class="flex-none mt-2"
               v-for="slot in reservation.slots"
               :key="slot">

              <time>{{ slot }}</time>
            </p>
          </li>
        </ol>

        <button type="button"
                class="inline-block w-32 px-3 py-2 mt-3 font-bold text-white duration-200 bg-red-700 rounded-lg md:ml-3 hover:bg-red-800 text-md"
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
  <div class="fixed top-0 left-0 hidden w-full h-full overflow-x-hidden overflow-y-auto outline-none modal fade"
       id="modal"
       tabindex="-1"
       aria-labelledby="deleteModal"
       aria-modal="true"
       role="dialog">
    <div
         class="relative w-auto pointer-events-none modal-dialog modal-dialog-centered">
      <div
           class="relative flex flex-col w-full text-current bg-white border-none rounded-md shadow-lg outline-none pointer-events-auto modal-content bg-clip-padding">
        <div
             class="flex items-center justify-between flex-shrink-0 p-4 border-b border-gray-200 modal-header rounded-t-md">
          <h5 class="text-xl font-medium leading-normal text-gray-800"
              id="exampleModalScrollableLabel">
            Are you sure you want to delete your reservation?
          </h5>
          <button type="button"
                  class="box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 btn-close focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  data-bs-dismiss="modal"
                  aria-label="Close"></button>
        </div>
        <div class="relative p-4 modal-body">
          <p>If you delete your reservation you can't be in the reservation
            room and you have to reserve again. a confirmation delete message
            will be sent to your email.</p>
        </div>
        <div
             class="flex flex-wrap items-center justify-end flex-shrink-0 p-4 border-t border-gray-200 modal-footer rounded-b-md">
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
import getTimeSlots from '../composables/getTimeSlots';

export default {
  components: { AppLoader },
  setup() {

    const route = useRoute();
    const router = useRouter();
    const { reservation, loadReservation, resError } = getSingleReservation(route.params.id);

    loadReservation();

    // get time slots of this date 
    const { timeSlots, load, error } = getTimeSlots(reservation.value.date);

    load();

    const handleDelete = async () => {
      if (!resError) {

        // here we will update the time slots and disable the reserved ones
        let slotsArr;

        const room = getRoomNumber(reservation.value.room);

        if (timeSlots.value) {
          if (room == '0') {
            slotsArr = timeSlots.value.rooms.first.slots;
            for (let i = 0; i < slotsArr.length; i++) {
              for (let j = 0; j < reservation.value.slots.length; j++) {
                if (slotsArr[i].base.slot == reservation.value.slots[j]) {
                  timeSlots.value.rooms.first.slots[i].base.reserved = false;
                }
                if (slotsArr[i].half.slot == reservation.value.slots()[j]) {
                  timeSlots.value.rooms.first.slots[i].half.reserved = false;
                }
              }
            }
          }
          if (room == '1') {
            slotsArr = timeSlots.value.rooms.second.slots;
            for (let i = 0; i < slotsArr.length; i++) {
              for (let j = 0; j < reservation.value.slots.length; j++) {
                if (slotsArr[i].base.slot == reservation.value.slots[j]) {
                  timeSlots.value.rooms.second.slots[i].base.reserved = false;
                }
                if (slotsArr[i].half.slot == reservation.value.slots[j]) {
                  timeSlots.value.rooms.second.slots[i].half.reserved = false;
                }
              }
            }
          }
          if (room == '2') {
            slotsArr = timeSlots.value.rooms.third.slots;
            for (let i = 0; i < slotsArr.length; i++) {
              for (let j = 0; j < reservation.value.slots.length; j++) {
                if (slotsArr[i].base.slot == reservation.value.slots[j]) {
                  timeSlots.value.rooms.third.slots[i].base.reserved = false;
                }
                if (slotsArr[i].half.slot == reservation.value.slots[j]) {
                  timeSlots.value.rooms.third.slots[i].half.reserved = false;
                }
              }
            }
          }
          // delete the previous document
          await appFirestore.collection('timeSlots').doc(timeSlots.value.id).delete();

          // add the new document (updated value)
          appFirestore.collection('timeSlots').add(timeSlots.value);
        }

        await appFirestore.collection('reservations').doc(route.params.id).delete();
      }

      // redirect to homepage
      router.push('/');
    }

    const getRoomNumber = (roomName) => {
      let result;
      switch (roomName) {
        case 'AyMakan Meeting Room':
          result = 0;
          break;
        case 'Smart Influence Meeting Room':
          result = 1;
          break;
        case 'General Meeting Room':
          result = 3;
          break;
      }

      return result;
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