<template>
  <app-wrapper>
    <div class="container mx-auto text-gray-700 min-h-[60vh]">

      <router-link to="/">
        <span class="flex items-center hover:text-gray-500 md:text-2xl ml-10">
          <font-awesome-icon icon="fa-solid fa-square-caret-left"
                             class="mr-1" />
          <p>Back</p>
        </span>
      </router-link>
      <div class="text-lg mt-6 font-bold md:text-3xl text-center w-full mb-4">
        <font-awesome-icon icon="fa-solid fa-calendar-check" />
        <p class="inline ml-3">
          {{ formatDate($route.query.date) }}</p>
      </div>


      <div class="w-full flex justify-center mt-9 h-full">

        <select name="LeaveType"
                @change="onRoomChange($event)"
                class="form-control outline-none border-none bg-gray-200 cursor-pointer appearance-none py-2 px-4 w-64 text-center focus:ring-amber-600 focus:ring-2">
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

        {{ setTime() }}

        <div
             class="grid grid-cols-2 p-7 md:grid-cols-3 lg:grid-cols-4 gap-x-15 h-full">

          <div v-for="index in 10"
               :key="index">

            <TimeSlot :baseHour="printBaseHour()"
                      :firstCheckboxLabel="printBaseHour()"
                      :secondCheckboxLabel="printAfterHalfHourSlot()"
                      :firstCheckboxName="printBaseHourName()"
                      :secondCheckboxName="printAfterHalfHourName()"
                      :morningOrNoon="setMorningOrNoon()"
                      @isFirstCheckboxDisabled="disableReservedSlots"
                      @isSecondCheckboxDisabled="disableReservedSlots"
                      @setTimeSlot="setTimeSlot"
                      @setSecondTimeSlot="setTimeSlot" />

            {{ updateRandomDateValue(60) }}

          </div>
        </div>

        <footer class="sticky bottom-1 p-2 flex justify-end"
                v-show="time.length !== 0">
          <router-link class="floating-btn"
                       :to="'/reservation?date=' + $route.query.date + '&room=' + getRoom() + '&time=' + getSortedSlots(time)">
            Reserve
            now
            <span class="ml-2">
              <font-awesome-icon icon="fa-solid fa-arrow-right-long"
                                 class=" bg-gray-500 p-1 rounded-full" />
            </span>
          </router-link>
        </footer>
      </div>

    </div>
  </app-wrapper>
</template>

<script>
import AppWrapper from '../components/AppWrapper.vue'
import TimeSlot from '@/components/TimeSlot.vue';
import lib from 'date-and-time';
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import getReservations from '../composables/getReservations';

export default {
    components: { TimeSlot, AppWrapper },
    setup() {

      // refs
      let date = ref(new Date()); 
      const room = ref("");
      const time = ref([]);

      const route = useRoute();
      
      
      // initializing time at 8:00 AM
      const setTime = () => {
        date.value.setHours(8);
        date.value.setMinutes(0);
      }
      
      // Print PM or AM after the time slot
      const setMorningOrNoon = () => {
        let hour = convertTo12Hours(date.value.getHours());
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

      const add30Minutes = () => {
        return date.value.getMinutes() + 30
      }

      const updateRandomDateValue = (value) => {
        date.value.setMinutes(date.value.getMinutes() + value)
      }

      const printBaseHour = () => {
        return convertTo12Hours(date.value.getHours()) + ':' + String(date.value.getMinutes()).padStart(2, '0');
      }

      // to use it in the id and name of the checkbox to take it // as a query string
      const printBaseHourName = () => {
        return String(convertTo12Hours(date.value.getHours())).padStart(2, '0') + String(date.value.getMinutes()).padStart(2, '0');
      }

      const printAfterHalfHourSlot = () => {
        return convertTo12Hours(date.value.getHours()) + ':' + String(add30Minutes()).padStart(2, '0')
      }

      // to use it in the id and name of the checkbox to take it // as a query string
      const printAfterHalfHourName = () => {
        return String(convertTo12Hours(date.value.getHours())).padStart(2, 0) + String(add30Minutes()).padStart(2, '0')
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

      const disableReservedSlots = (timeSlot) => {
        const { reservations, load, error } = getReservations();

        load();

        let result = true;

          reservations.value.forEach(reservation => {
            reservation.slots.forEach(slot => {
              console.log(route.query.date)
              console.log(reservation.date)
              console.log(reservation.room)
              console.log(slot)

              if (route.query.date == reservation.date & timeSlot == slot & reservation.room === room.value) {

                result = false;
              }
            })
          });
        
        return result;
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
        updateRandomDateValue,
        formatDate,
        onRoomChange,
        roomIsSelected,
        setTime,
        setMorningOrNoon,
        printBaseHour,
        printAfterHalfHourSlot,
        printBaseHourName,
        printAfterHalfHourName,
        getRoom,
        setTimeSlot,
        getSortedSlots,
        getSlot,
        disableReservedSlots,
        // variables
        date,
        time
      }

    }
}
</script>

<style>

</style>

