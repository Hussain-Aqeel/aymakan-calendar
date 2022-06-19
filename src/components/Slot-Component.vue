<template>
  <div class="slot">
    <p class="text-2xl md:text-3xl font-bold">
      {{ baseHour }}
      <span>{{ morningOrNoon }}</span>
    </p>
    <div class="form-check flex items-center">
      <input class="form-check-input checkbox"
             type="checkbox"
             :name="firstCheckboxName"
             :id="firstCheckboxName"
             @change="setTimeSlot(firstCheckboxName)">
      <label class="form-check-label text-md ml-2"
             :for="firstCheckboxName">
        {{ firstCheckboxLabel }}
      </label>
    </div>
    <div>
      <input class="form-check-input checkbox"
             type="checkbox"
             :name="secondCheckboxName"
             :id="secondCheckboxName"
             @change="setTimeSlot(secondCheckboxName)">
      <label class="form-check-label text-md md:text-lg ml-2"
             :for="secondCheckboxName">{{ secondCheckboxLabel }}</label>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  props: [
    'baseHour',
    'firstCheckboxLabel',
    'secondCheckboxLabel',
    'morningOrNoon',
    'firstCheckboxName',
    'secondCheckboxName',
    'firstCheckboxCheck',
    'secondCheckboxCheck'
  ],

  setup() {

    const time = ref([]);
    
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
      setTimeSlot
    }
  }
}
</script>

<style>

</style>