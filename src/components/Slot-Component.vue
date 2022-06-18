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
             :id="firstCheckboxName">
      <label class="form-check-label text-md ml-2"
             :for="firstCheckboxName">
        {{ firstCheckboxLabel }}
      </label>
    </div>
    <div>
      <input class="form-check-input checkbox"
             type="checkbox"
             :name="secondCheckboxName"
             :id="secondCheckboxName">
      <label class="form-check-label text-md md:text-lg ml-2"
             :for="secondCheckboxName">{{ secondCheckboxLabel }}</label>
    </div>
  </div>
</template>

<script>
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
    const setTimeSlot = (timeSlot) => {
      this.$emit('set-time-slot', timeSlot);
    }

    return {
      setTimeSlot
    }
  }
}
</script>

<style>

</style>