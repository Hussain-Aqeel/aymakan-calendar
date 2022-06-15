<template>
  <div class="w-full">
    <NavbarComponentVue />
    <div class="container mx-auto text-gray-700">

      <div class="w-full flex justify-center">
        <select class="py-2 px-4 w-48 text-center"
                name=""
                id="">
          <option value=""
                  selected
                  disabled
                  hidden> Select Room </option>
          <option value="ay"> AyMakan Room </option>
          <option value="si"> Smart Influence Room </option>
          <option value="gn"> General Room </option>
        </select>
      </div>

      <div class="grid grid-cols-2 p-7">
        <div
             class="slot flex flex-col justify-between h-30 bg-gray-500 drop-shadow-md outline outline-0 hover:outline-offset-2 rounded-md m-4 p-5 text-xl bg-amber-400 hover:bg-amber-200 hover:cursor-pointer">
          <p class="text-2xl font-bold">
            8:00
          </p>
          <div>
            <input class="accent-amber-700"
                   type="checkbox"
                   name="slot-1"
                   id="">
            <label class="text-sm"
                   for="slot-1">
              8:00
            </label>
          </div>
          <div>
            <input class="accent-amber-700"
                   type="checkbox"
                   name="slot-1"
                   id="">
            <label class="text-sm"
                   for="slot-1">8:30</label>
          </div>
        </div>
      </div>

      <footer class=" sticky bottom-0 p-2 flex justify-end">
        <button
                class="drop-shadow-md text-gray-100 weight-bold bg-gray-600 p-2 rounded-3xl font-bold">Reserve
          now
          <span class="ml-2">
            <em
               class="fa-solid fa-arrow-right-long bg-gray-500 p-1 rounded-full"></em>
          </span>
        </button>
      </footer>
    </div>
    <FooterComponentVue />
  </div>
</template>

<script>
import NavbarComponentVue from './components/Navbar-Component.vue';
import FooterComponentVue from './components/Footer-Component.vue';
export default {
    components: { NavbarComponentVue, FooterComponentVue }
}
</script>

<style>

</style>

