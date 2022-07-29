<template>
  <div class="slot">
    <p class="text-xl font-bold md:text-3xl">
      {{ baseHour }} <span>{{ morningOrNoon }}</span>
    </p>
    <div class="flex items-center form-check">
      <input class="form-check-input checkbox"
             type="checkbox"
             :name="firstCheckboxName"
             :id="firstCheckboxName"
             :disabled="isFirstCheckboxDisabled"
             v-model="firstCheckboxModal">
      <label class="ml-2 form-check-label text-md"
             :for="firstCheckboxName"> {{ firstCheckboxLabel }}
      </label>
    </div>
    <div>
      <input class="form-check-input checkbox"
             type="checkbox"
             :name="secondCheckboxName"
             :id="secondCheckboxName"
             :disabled="isSecondCheckboxDisabled"
             v-model="secondCheckboxModal">
      <label class="ml-2 form-check-label text-md md:text-lg"
             :for="secondCheckboxName">{{ secondCheckboxLabel }}</label>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    baseHour: String,
    firstCheckboxLabel: String,
    secondCheckboxLabel: String,
    morningOrNoon: String,
    firstCheckboxName: String,
    secondCheckboxName: String,
    addToArray: Boolean,
    isFirstCheckboxDisabled: Boolean,
    isSecondCheckboxDisabled: Boolean, 
  },

  setup(props, context) {
    const firstCheckboxModal = computed({
      get() {
        return props.firstCheckboxName
      },
      set(val) {
        let addToArray = (val) ? true : false;
        let setFirstCheckbox = props.firstCheckboxName;
        context.emit('setTimeSlot', setFirstCheckbox, addToArray);
      },
    });

    const secondCheckboxModal = computed({
      get() {
        return props.secondCheckboxName;
      },
      set(val) {
        let addToArray = (val) ? true : false;
        let setSecondCheckbox = props.secondCheckboxName;
        context.emit('setSecondTimeSlot', setSecondCheckbox, addToArray);
      },
    });

    return {
      firstCheckboxModal,
      secondCheckboxModal
    }
  }
}
</script>