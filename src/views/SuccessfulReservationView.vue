<template>
  <div class="container mx-auto text-gray-700 min-h-[60vh]">
    <div class="flex flex-col items-center">
      <img src="images/Sent-Email-color.svg"
           alt="email is sent"
           class=" h-60 w-60 lg:w-80 lg:h-80">
      <div class="p-8 mt-10 text-lg text-center">
        <p class="mb-4">Your next meeting is successfully reserved.</p>
        <p>You will receive an <strong>email</strong> with the reservation
          details.</p>
        <router-link to="/calendar" class="inline-block px-6 py-2 mt-10 bg-amber-400 rounded-xl hover:bg-amber-300">View Calendar</router-link>
      </div>

    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>