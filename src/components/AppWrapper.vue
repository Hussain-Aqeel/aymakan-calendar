<template>
  <div class="w-screen min-h-screen box-border">
    <app-navbar />
    <slot></slot>
    <app-footer />
  </div>
</template>

<script>
import AppNavbar from '@/components/AppNavbar.vue'
import AppFooter from '@/components/AppFooter.vue'
export default {
  components: { AppNavbar, AppFooter },

}
</script>