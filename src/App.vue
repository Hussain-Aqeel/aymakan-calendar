<template>
  <app-wrapper>
    <router-view v-slot="{Component}">
      <!-- Use any custom transition and fallback to `fade` -->
      <transition name="slide" mode="out-in">
        <component :is="Component"
                   :key="$route.path" />
      </transition>
    </router-view>
  </app-wrapper>
</template>

<script>
import AppWrapper from './components/AppWrapper.vue'

export default {
    components: { AppWrapper }
}
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
