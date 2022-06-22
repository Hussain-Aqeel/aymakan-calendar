<template>
  <div
       class="container mx-auto flex flex-col justify-center items-center h-full">

    <h1 class="mb-48 text-2xl text-center">
      Welcome to Aymakan meeting reserver
    </h1>

    <div class="mb-48 w-5/6">

      <router-link to="/calendar">
        <p
           class="drop-shadow-md md:p-3 p-2 bg-amber-400 hover:bg-amber-300 transition-colors duration-200 rounded-xl w-full md:text-xl font-bold mb-5 text-center py-4 capitalize">
          view calendar
        </p>
      </router-link>

      <router-link to="/reserve">
        <p
           class="drop-shadow-md md:p-3 p-2 bg-amber-400 hover:bg-amber-300 transition-colors duration-200 rounded-xl w-full md:text-xl font-bold mb-5 text-center py-4 capitalize">
          reserve meeting room
        </p>
      </router-link>

    </div>
  </div>
</template>

<script>
export default {
  
}

</script>

<style>

</style>