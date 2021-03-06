<template>
  <div class="container mx-auto text-gray-700 min-h-[60vh]">

    <router-link to="/reserve">
      <span class="flex items-center ml-10 hover:text-gray-500 md:text-2xl">
        <font-awesome-icon icon="fa-solid fa-square-caret-left"
                           class="mr-1" />
        <p>Back</p>
      </span>
    </router-link>
    <div class="w-full mt-6 mb-4 text-lg font-bold text-center md:text-3xl">
      <font-awesome-icon icon="fa-solid fa-calendar-check" />
      <p class="inline ml-3">
        {{ formatDate($route.query.date) }}</p>
    </div>


    <div class="flex justify-center w-full h-full mt-9">

      <select name="LeaveType"
              @change="onRoomChange($event)"
              class="w-64 px-4 py-2 text-center bg-gray-200 border-none outline-none appearance-none cursor-pointer form-control focus:ring-amber-600 focus:ring-2">
        <option selected
                disabled
                hidden
                value=""> Select Room </option>
        <option value="0"> AyMakan Room
        </option>
        <option value="1"> Smart
          Influence Room </option>
        <option value="2"> General Room
        </option>
      </select>
    </div>

    <div v-if="roomIsSelected()">
      <div v-if="timeSlots">

        <div v-if="getRoom() == 0"
             class="grid h-full grid-cols-2 p-7 md:grid-cols-3 lg:grid-cols-4 gap-x-15">
          <div v-for="slot in timeSlots.rooms.first.slots"
               :key="slot">
            <TimeSlot :baseHour="slot.base.slot"
                      :firstCheckboxLabel="slot.base.slot"
                      :secondCheckboxLabel="slot.half.slot"
                      :firstCheckboxName="slot.base.slot.replace(':', '')"
                      :secondCheckboxName="slot.half.slot.replace(':', '')"
                      :morningOrNoon="setMorningOrNoon(slot.base.slot.substring(0, 2))"
                      :isFirstCheckboxDisabled="slot.base.reserved"
                      :isSecondCheckboxDisabled="slot.half.reserved"
                      @setTimeSlot="setTimeSlot"
                      @setSecondTimeSlot="setTimeSlot" />
          </div>
        </div>

        <div v-if="getRoom() == 1"
             class="grid h-full grid-cols-2 p-7 md:grid-cols-3 lg:grid-cols-4 gap-x-15">
          <div v-for="slot in timeSlots.rooms.second.slots"
               :key="slot">
            <TimeSlot :baseHour="slot.base.slot"
                      :firstCheckboxLabel="slot.base.slot"
                      :secondCheckboxLabel="slot.half.slot"
                      :firstCheckboxName="slot.base.slot.replace(':', '')"
                      :secondCheckboxName="slot.half.slot.replace(':', '')"
                      :morningOrNoon="setMorningOrNoon(slot.base.slot.substring(0, 2))"
                      :isFirstCheckboxDisabled="slot.base.reserved"
                      :isSecondCheckboxDisabled="slot.half.reserved"
                      @setTimeSlot="setTimeSlot"
                      @setSecondTimeSlot="setTimeSlot" />
          </div>
        </div>

        <div v-if="getRoom() == 2"
             class="grid h-full grid-cols-2 p-7 md:grid-cols-3 lg:grid-cols-4 gap-x-15">
          <div v-for="slot in timeSlots.rooms.third.slots"
               :key="slot">
            <TimeSlot :baseHour="slot.base.slot"
                      :firstCheckboxLabel="slot.base.slot"
                      :secondCheckboxLabel="slot.half.slot"
                      :firstCheckboxName="slot.base.slot.replace(':', '')"
                      :secondCheckboxName="slot.half.slot.replace(':', '')"
                      :morningOrNoon="setMorningOrNoon(slot.base.slot.substring(0, 2))"
                      :isFirstCheckboxDisabled="slot.base.reserved"
                      :isSecondCheckboxDisabled="slot.half.reserved"
                      @setTimeSlot="setTimeSlot"
                      @setSecondTimeSlot="setTimeSlot" />
          </div>
        </div>

      </div>
      <div v-else
           class="
         min-h-[40vh]
         grid
         place-content-center">
        <AppLoader />
      </div>

      <footer class="sticky flex justify-end p-2 bottom-1"
              v-show="time.length !== 0">
        <router-link class="floating-btn"
                     :to="'/reservation?date=' + $route.query.date + '&room=' + getRoom() + '&time=' + getSortedSlots(time)">
          Reserve
          now
          <span class="ml-2">
            <font-awesome-icon icon="fa-solid fa-arrow-right-long"
                               class="p-1 bg-gray-500 rounded-full " />
          </span>
        </router-link>
      </footer>
    </div>

  </div>
</template>

<script>
import TimeSlot from '@/components/TimeSlot.vue';
import lib from 'date-and-time';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import getTimeSlots from '../composables/getTimeSlots';
import AppLoader from '../components/AppLoader.vue';

export default {
    components: { TimeSlot, AppLoader },
    setup() {

      // refs
      let date = ref(new Date()); 
      const room = ref("");
      const time = ref([]);

      const route = useRoute();

      // get time slots and print cards
      const { timeSlots, load, error } = getTimeSlots(route.query.date);

      load();
      
      // Print PM or AM after the time slot
      const setMorningOrNoon = (hour) => {
        if((hour >= 8) && (hour < 12)) {
          return 'AM'
        } else {
          return 'PM';
          }
      }
      
      const convertTo12Hours = (hour) => {
        return hour % 12 || 12;
      }

      const onRoomChange = (e) => {
        room.value = e.target.value;
      }

      const getRoom = () => {
        return room.value;
      }

      const roomIsSelected = () => {
        return room.value != '';
      }

      const getSlot = () => {
        return convertTo12Hours(date.value.getHours()) + String(date.value.getMinutes()).padStart(2, '0');
      }

      // $route.query.date
      const formatDate = (queryDate) => {
        const arr = queryDate.split("-");
        const dateObj = new Date(parseInt(arr[2]), parseInt(arr[1]) - 1, parseInt(arr[0]));        
        return lib.format(dateObj, 'dddd, MMM DD');
      }


      function setTimeSlot(timeSlot, addToArray) {
        if (addToArray) {
          time.value.push(timeSlot);
        } else {
          // delete item from array
          time.value = time.value.filter(item => item !== timeSlot)
        }
      }

      const getSortedSlots = (arr) => {
        const morningSlots = [];
        const noonSlots = [];
        for (const element of arr) {
          let hour = element.substring(0, 2);
          if ((hour >= 8) && (hour <= 12)) {
            morningSlots.push(element);
          } else {
            noonSlots.push(element);
          }
        }

        morningSlots.sort();
  
        noonSlots.sort((a, b) => {
          return a - b
        });

        return [ ...morningSlots, ...noonSlots];
      }

      return {
        // functions
        formatDate,
        onRoomChange,
        roomIsSelected,
        setMorningOrNoon,
        getRoom,
        setTimeSlot,
        getSortedSlots,
        getSlot,
        // variables
        date,
        time,
        timeSlots,
        error,
      }

    }
}
</script>

<style>

</style>

