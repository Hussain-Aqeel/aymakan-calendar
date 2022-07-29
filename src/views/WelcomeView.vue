<template>
  <div
       class="container mx-auto flex flex-col justify-center items-center min-h-[60vh]">


    <div class="w-9/12 md:w-2/5">
      <router-link to="/calendar">
        <p
           class="p-2 py-4 mb-5 font-bold text-center capitalize transition-colors duration-200 drop-shadow-md md:p-3 bg-amber-400 hover:bg-amber-300 rounded-xl md:text-xl">
          view reservations
        </p>
      </router-link>

      <router-link to="/reserve">
        <p
           class="p-2 py-4 mb-5 font-bold text-center capitalize transition-colors duration-200 drop-shadow-md md:p-3 bg-amber-400 hover:bg-amber-300 rounded-xl md:text-xl">
          reserve meeting room
        </p>
      </router-link>

    </div>


  </div>
</template>

<script>

export default {
  setup() {}
}
</script>
