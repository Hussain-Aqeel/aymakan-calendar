<template>
  <app-wrapper>
    <div
         class="container mx-auto flex flex-col justify-center items-center min-h-[60vh]">


      <div class=" w-9/12 md:w-2/5">
        <router-link to="/calendar">
          <p
             class="drop-shadow-md md:p-3 p-2 bg-amber-400 hover:bg-amber-300 transition-colors duration-200 rounded-xl md:text-xl font-bold mb-5 text-center py-4 capitalize">
            view calendar
          </p>
        </router-link>

        <router-link to="/reserve">
          <p
             class="drop-shadow-md md:p-3 p-2 bg-amber-400 hover:bg-amber-300 transition-colors duration-200 rounded-xl md:text-xl font-bold mb-5 text-center py-4 capitalize">
            reserve meeting room
          </p>
        </router-link>
      </div>


    </div>
  </app-wrapper>

</template>

<script>

import AppWrapper from '../components/AppWrapper.vue'
export default {
    components: { AppWrapper }
}
</script>

<style>

</style>