<template>
  <div
       class="container mx-auto min-h-[60vh] text-gray-700">
    <router-link to="/">
      <span
            class="flex items-center ml-10 hover:text-gray-500 md:text-2xl mb-7">
        <font-awesome-icon icon="fa-solid fa-square-caret-left"
                           class="mr-1" />
        <p>Back</p>
      </span>
    </router-link>


    <div class="flex justify-center w-full">
      <span class="flex items-center justify-between w-48 md:w-80">
        <button @click="previousWeek()">
          <font-awesome-icon icon="fa-solid fa-chevron-left"
                             class="p-4" />
        </button>
        <ul>
          <li class="font-bold md:text-xl">
            {{ displayedDate }}
          </li>
        </ul>
        <button @click="nextWeek()">
          <font-awesome-icon icon="fa-solid fa-chevron-right"
                             class="p-4" />
        </button>
      </span>
    </div>

    <form action="">

      <div v-for="(day, index) in weekday"
           v-bind:key="day.id">
        <div
             v-if="lib.addDays(currentDate, index - currentDate.getDay()) < currentDate">

          <div
               class="flex items-center justify-between p-5 m-4 text-center bg-gray-200 rounded-md drop-shadow-md outline outline-0 hover:outline-offset-2 md:text-xl">

            <strong>{{ day.name }}</strong>

            <p class="text-xs md:text-sm"
               v-bind="currentDate">
              {{ formatDate(setNextDay(currentDate, index - currentDate.getDay())) }}
            </p>

          </div>
        </div>
        <div v-else>
          <router-link
                       :to="'/calendar/' +
                       formatQueryDate(getNextDay(currentDate, index - currentDate.getDay()))">
            <div
                 class="flex items-center justify-between p-5 m-4 text-center rounded-md drop-shadow-md outline outline-0 hover:outline-offset-2 md:text-xl bg-amber-400 hover:bg-amber-300 hover:cursor-pointer">

              <strong>{{ day.name }}</strong>
              <p class="text-xs md:text-sm">
                {{ formatDate(getNextDay(currentDate, index - currentDate.getDay())) }}
              </p>
            </div>
          </router-link>

        </div>
      </div>
    </form>
  </div>
</template>

<script>
import lib from 'date-and-time';
import { ref } from 'vue';

export default {
  setup() {
    const weekday =
      [
        {
          id: 0,
          name: "Sunday"
        },
        {
          id: 1,
          name: "Monday"
        },
        {
          id: 2,
          name: "Tuesday"
        },
        {
          id: 3,
          name: "Wednesday"
        },
        {
          id: 4,
          name: "Thursday"
        }
      ];

    let firstDate = ref(new Date());
    let currentDate = ref(new Date());

    let displayedDate = ref(lib.format(currentDate.value, 'ddd, MMM DD'));

    const setNextDay = (a, b) => {
      return lib.addDays(a, b);
    }

    const getNextDay = (a, b) => {
      return lib.addDays(a, b);
    }

    const formatDate = (date) => {
      return lib.format(date, 'MMM/DD');
    }

    const formatQueryDate = (date) => {
      return lib.format(date, 'D-M-YYYY')
    }

    const setDisplayedDate = (date) => {
      displayedDate.value = lib.format(date, 'ddd, MMM DD');
    }

    const nextWeek = () => {
      if (currentDate.value.getDay() !== 0) {
        let counter = parseInt(0);
        for (let i = currentDate.value.getDay(); i > 0; i--) {
          counter++;
        }
        currentDate.value = lib.addDays(currentDate.value, 7 - counter);
      } else {
        currentDate.value = lib.addDays(currentDate.value, 7);
      }
      setDisplayedDate(currentDate.value);
    }

    const previousWeek = () => {
      if (lib.addDays(currentDate.value, -7) >= firstDate.value) {
        currentDate.value = lib.addDays(currentDate.value, -7);
      } else {
        currentDate.value = firstDate.value;
      }
      setDisplayedDate(currentDate.value);
    }


    // expose to template and other options API hooks
    return {
      displayedDate,
      weekday,
      currentDate,
      lib,
      setDisplayedDate,
      nextWeek,
      previousWeek,
      setNextDay,
      getNextDay,
      formatDate,
      formatQueryDate
    }
  },

}
</script>

<style>
</style>
