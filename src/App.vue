<template>

  <div class="w-full">

    <NavbarComponentVue />
    <div class="container mx-auto text-gray-700">

      <div class="w-full flex justify-center">
        <span class="w-48 md:w-80 flex justify-between">
          <a href="/?previous=true"><em
                class="fa-solid fa-chevron-left"></em></a>
          <h5 class="md:text-xl font-bold">
          </h5>
          <a href="/?next=true"><em
                class="fa-solid fa-chevron-right"></em></a>
        </span>
      </div>

      <form action="">
        <div
             class="drop-shadow-md outline outline-0 hover:outline-offset-2 rounded-md m-4 p-5 text-center md:text-xl bg-amber-400 hover:bg-amber-300 hover:cursor-pointer flex items-center justify-between">

          <strong>Sunday</strong>
          <p class="text-xs md:text-sm">
            12/12/2017
          </p>
        </div>
      </form>

    </div>
    <FooterComponentVue />
  </div>
</template>

<script>
import NavbarComponentVue from './components/Navbar-Component.vue'
import FooterComponentVue from './components/Footer-Component.vue'

export default {
  name: 'App',
  components: {
    NavbarComponentVue,
    FooterComponentVue
}
}
</script>

<style>

</style>
