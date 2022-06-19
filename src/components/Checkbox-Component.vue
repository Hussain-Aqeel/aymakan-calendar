<template>
  <div>
    <input class="form-check-input checkbox"
           type="checkbox"
           :name="secondCheckboxName"
           :id="secondCheckboxName"
           @change="$emit('setSecondSlot', { slot })">
    <label class="form-check-label text-md md:text-lg ml-2"
           :for="secondCheckboxName">{{ secondCheckboxLabel }}</label>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>