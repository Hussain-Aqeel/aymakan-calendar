<script setup>
import { defineEmits, defineProps, computed } from 'vue';

const emit = defineEmits(['setTimeSlot', 'setSecondTimeSlot']);

const props = defineProps({
  baseHour: {
    type: String,
  },
  firstCheckboxLabel: {
    type: String,
  },
  secondCheckboxLabel: {
    type: String,
  },
  morningOrNoon: {
    type: String,
  },
  firstCheckboxName: {
    type: String,
  },
  secondCheckboxName: {
    type: String,
  },
  firstCheckboxCheck: {
    type: String,
  },
  secondCheckboxCheck: {
    type: String,
  },
  addToArray: {
    type: Boolean,
  },
  disableCheckbox: {
    type: Boolean,
  }
});


const firstCheckboxModal = computed({
  get() {
    return props.firstCheckboxName
  },
  set(val) {
    let addToArray = (val) ? true : false;
    let setFirstCheckbox = props.firstCheckboxName;
    emit('setTimeSlot', setFirstCheckbox, addToArray);
  },
});

const secondCheckboxModal = computed({
  get() {
    return props.secondCheckboxName;
  },
  set(val) {
    let addToArray = (val) ? true : false;
    let setSecondCheckbox = props.secondCheckboxName;
    emit('setSecondTimeSlot', setSecondCheckbox, addToArray);
  },
});

const isFirstCheckboxDisabled = () => {
  let firstCheckboxValue = props.firstCheckboxLabel
  emit('isFirstCheckboxDisabled', firstCheckboxValue)
}

const isSecondCheckboxDisabled = () => {
  let secondCheckboxValue = props.secondCheckboxLabel
  emit('isFirstCheckboxDisabled', secondCheckboxValue)
}


</script>
<template>
  <div class="slot">
    <p class="text-2xl md:text-3xl font-bold">
      {{ baseHour }} <span>{{ morningOrNoon }}</span>
    </p>
    <div class="form-check flex items-center">
      <input class="form-check-input checkbox"
             type="checkbox"
             :name="props.firstCheckboxName"
             :id="props.firstCheckboxName"
             :checked="props.validateCheck"
             :disabled="isFirstCheckboxDisabled"
             v-model="firstCheckboxModal">
      <label class="form-check-label text-md ml-2"
             :for="props.firstCheckboxName"> {{ props.firstCheckboxLabel }}
      </label>
    </div>
    <div>
      <input class="form-check-input checkbox"
             type="checkbox"
             :name="props.secondCheckboxName"
             :id="props.secondCheckboxName"
             :checked="props.validateCheck"
             :disabled="isSecondCheckboxDisabled"
             v-model="secondCheckboxModal">
      <label class="form-check-label text-md md:text-lg ml-2"
             :for="props.secondCheckboxName">{{ props.secondCheckboxLabel }}</label>
    </div>
  </div>
</template>
