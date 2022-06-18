<template>
  <div class="w-screen min-h-screen box-border">
    <navbar-component />
    <slot></slot>
    <footer-component />
  </div>
</template>

<script>
import NavbarComponent from '@/components/Navbar-Component.vue'
import FooterComponent from '@/components/Footer-Component.vue'
export default {
  components: { NavbarComponent, FooterComponent },

}
</script>

<style>

</style>