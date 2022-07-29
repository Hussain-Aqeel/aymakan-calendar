<template>

  <head>
    <title>Not Found</title>
  </head>

  <div class="container flex flex-col items-center mx-auto">
    <h1 id="title" class="text-2xl font-bold">Error 404</h1>
    <img src="/images/not-found.png"
         alt="error"
         class="w-72 h-96" />
    <p class="text-xl">This Page is Lost in Space</p>
    <router-link to="/" class="px-5 py-3 mt-8 text-xl font-bold text-black duration-300 bg-amber-400 rounded-xl hover:bg-amber-300">
      Go Home
    </router-link>
  </div>

</template>

<script>
export default {

}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

  body {
    font-family: 'Nunito', sans-serif;
  }

  #title {
    font-family: 'Press Start 2P', cursive;
  }

</style>