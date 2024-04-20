<script>
import { RouterLink, RouterView } from 'vue-router'

import { useLocationStore } from './stores/location'

import "@/assets/style/mobile.scss";

import HeaderBar from './components/HeaderBar.vue'
import CenterBar from './components/CenterBar.vue'
import FooterBar from './components/FooterBar.vue'
import LoadingStatus from './components/LoadingStatus.vue'

export default {
  components: {
    HeaderBar,
    FooterBar,
    CenterBar,
    LoadingStatus,
  },
  setup() {
    const locationStore = useLocationStore();
    locationStore.fetchLocation();

    return {
      locationStore
    }
  },
}
</script>

<template>
  <section class="main-container">
    <header-bar />

    <template v-if=" locationStore.getLocation !== '定位中' ">
      <div class="center-wrap">
        <router-view />
      </div>
    </template>

    <template v-else>
      <loading-status />
    </template>

    <footer-bar />
  </section>
</template>

<style lang="scss">
body,
html {
  margin: 0;
  padding: 0;

  width: 100%;
  height: 100%;

  scrollbar-width: thin;
}

.main-container {
  position: relative;

  .center-wrap {
    position: relative;
  }
}
</style>
