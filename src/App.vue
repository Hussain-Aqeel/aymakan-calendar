<template>
  <app-navbar />
    <router-view v-slot="{Component}">
      <!-- Use any custom transition and fallback to `fade` -->
      <transition name="slide"
                  mode="out-in">
        <component :is="Component"
                    :key="$route.path" />
      </transition>
    </router-view>
  <app-footer />
</template>

<script>
import AppNavbar from './components/AppNavbar.vue';
import AppFooter from './components/AppFooter.vue';

export default { components: { AppNavbar, AppFooter } }
</script>
<style>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 300ms, transform 300ms;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(30%);
}
</style>
