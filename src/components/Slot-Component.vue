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
             :ref="firstCheckboxName"
             :checked="validateCheck"
             @change="setTimeSlot">
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
             ref="checkboxValue"
             :checked="validateCheck"
             @click="setSecondTimeSlot">
      <label class="form-check-label text-md md:text-lg ml-2"
             :for="secondCheckboxName">{{ secondCheckboxLabel }}</label>
    </div>
  </div>
</template>

<script>
import { watch } from '@vue/runtime-core';
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
    'secondCheckboxCheck',
    'validateCheck'
  ],

  setup(props, context) {

    const checkboxValue = ref()

    const setSecondTimeSlot = () => {
        context.emit('setSecondTimeSlot', props.secondCheckboxName)
    }

    const setTimeSlot = () => {
      console.log(checkboxValue)
        context.emit('setTimeSlot', checkboxValue.value)
    }

    return {
      setTimeSlot,
      setSecondTimeSlot,
    }
  }
}
</script>
<style>

</style>