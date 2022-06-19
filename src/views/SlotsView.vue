<template>
  <WrapperViewVue>
    <div class="container mx-auto text-gray-700 h-full">

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
        <select class="outline-none border-none bg-gray-200 cursor-pointer appearance-none py-2 px-4 w-64 text-center focus:ring-amber-600 focus:ring-2 focus:outline-amber-"
                name=""
                id="">
          <option selected
                  disabled
                  hidden> Select Room </option>
          <option @click="changeRoom('Aymakan Meeting Room')"> AyMakan Room
          </option>
          <option @click="changeRoom('Smart Influence Meeting Room')"> Smart
            Influence Room </option>
          <option @click="changeRoom('General Meeting Room')"> General Room
          </option>
        </select>
      </div>

      <div v-if="roomIsSelected()">

        {{ setTime() }}
        <div
             class="grid grid-cols-2 p-7 md:grid-cols-3 lg:grid-cols-4 gap-x-15 h-full">

          <div v-for="index in 10"
               :key="index">

            <!-- <div class="slot">
              <p class="text-2xl md:text-3xl font-bold">
                {{ printBaseHour() }}
                <span>{{ setMorningOrNoon() }}</span>
              </p>
              <div class="form-check flex items-center">
                <input class="form-check-input checkbox"
                       type="checkbox"
                       :name="printBaseHourName()"
                       :id="printBaseHourName()"
                       v-on:change="setTimeSlot(printBaseHourName())">
                <label class="form-check-label text-md ml-2"
                       :for="printBaseHourName()">
                  {{ printBaseHour() }}
                </label>
              </div>
              <div>
                <input class="form-check-input checkbox"
                       type="checkbox"
                       :name="printAfterHalfHourName()"
                       :id="printAfterHalfHourName()"
                       v-on:change="setTimeSlot(printAfterHalfHourName())">
                <label class="form-check-label text-md md:text-lg ml-2"
                       :for="printAfterHalfHourName()">{{ printAfterHalfHourSlot() }}</label>
              </div>
            </div> -->

            <SlotComponentVue :baseHour="printBaseHour()"
                              :firstCheckboxLabel="printBaseHour()"
                              :secondCheckboxLabel="printAfterHalfHourSlot()"
                              :firstCheckboxName="printBaseHourName()"
                              :secondCheckboxName="printAfterHalfHourName()"
                              :morningOrNoon="setMorningOrNoon()" />

            {{ updateRandomDateValue(60) }}

          </div>

          {{ setTime() }}
        </div>

        <footer class=" sticky bottom-1 p-2 flex justify-end">
          <router-link class="floating-btn"
                       :to="'/reservation?date=' + $route.query.date + '&room=' + getRoom() + '&time=' + getSlotTime()">
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
  </WrapperViewVue>
</template>

<script>
import WrapperViewVue from './WrapperView.vue'
import SlotComponentVue from '@/components/Slot-Component.vue';
import lib from 'date-and-time';
import { ref } from 'vue';

export default {
    components: { WrapperViewVue, SlotComponentVue },
    setup() {

      let randomDate = ref(new Date()); 
      
      const setTime = () => {
        randomDate.value.setHours(8);
        randomDate.value.setMinutes(0);
      }
      
      const setMorningOrNoon = () => {
        let hour = convertTo12Hours(randomDate.value.getHours());
        if((hour >= 8) && (hour < 12)) {
          return 'AM'
        } else {
          return 'PM';
          }
      }

      const convertTo12Hours = (hour) => {
        return hour % 12 || 12;
      }

      const room = ref("");
      const slots = ref([
        '0800',
        '0830',
        '0900',
        '0930',
        '1000',
        '1030',
        '1100',
        '1130',
        '1200',
        '1230',
        '0100',
        '0130',
        '0200',
        '0230',
        '0300',
        '0330',
        '0400',
        '0430', 
        '0500',
        '0530',
        '0600',
        '0630',
      ]);

      const time = ref([]);

      const changeRoom = (roomName) => {
        room.value = roomName;
      }

      const getRoom = () => {
        return room.value;
      }

      const getSlotTime = () => {
        return time.value;
      }

      const roomIsSelected = () => {
        return room.value !== '' ? true : false;
      }

      const add30Minutes = () => {
        return randomDate.value.getMinutes() + 30
      }

      const updateRandomDateValue = (value) => {
        randomDate.value.setMinutes(randomDate.value.getMinutes() + value)
      }

      const printBaseHour = () => {
        return convertTo12Hours(randomDate.value.getHours()) + ':' + String(randomDate.value.getMinutes()).padStart(2, '0');
      }

      // to use it in the id and name of the checkbox to take it // as a query string
      const printBaseHourName = () => {
        return convertTo12Hours(randomDate.value.getHours()) + String(randomDate.value.getMinutes()).padStart(2, '0');
      }

      const printAfterHalfHourSlot = () => {
        return convertTo12Hours(randomDate.value.getHours()) + ':' + String(add30Minutes()).padStart(2, '0')
      }

      // to use it in the id and name of the checkbox to take it // as a query string
      const printAfterHalfHourName = () => {
        return convertTo12Hours(randomDate.value.getHours()) + String(add30Minutes()).padStart(2, '0')
      }

      const getSlot = () => {
        return convertTo12Hours(randomDate.value.getHours()) + String(randomDate.value.getMinutes()).padStart(2, '0');
      }

      // $route.query.date
      const formatDate = (date) => {
        const arr = date.split("-");
        const dateObj = new Date(parseInt(arr[2]), parseInt(arr[1]) - 1, parseInt(arr[0]));        
        return lib.format(dateObj, 'dddd, MMM DD');
      }

      const setTimeSlot = (timeSlot) => {
        // const date = new Date();
        // date.value.setHours(8);
        // randomDate.value.setMinutes(0);

        console.log(timeSlot);
        console.log(parseInt(timeSlot))
        let lastIndex = time.value.length !== 0 ? time.value.length - 1 : 0;

        let lastItem = time.value[lastIndex];

        console.log(time.value);
        if (lastIndex === 0 || parseInt(timeSlot) - lastItem === 30 || parseInt(timeSlot) - lastItem === 70) {
          time.value.push(parseInt(timeSlot));

        }

      }

      return {
        // functions
        updateRandomDateValue,
        formatDate,
        changeRoom,
        roomIsSelected,
        setTime,
        setMorningOrNoon,
        printBaseHour,
        printAfterHalfHourSlot,
        printBaseHourName,
        printAfterHalfHourName,
        getRoom,
        setTimeSlot,
        getSlotTime,
        getSlot,
        // variables
        randomDate,
        slots
      }

    }
}
</script>

<style>

</style>

