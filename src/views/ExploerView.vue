<style lang="scss" scoped>
.main-explore-wrap {
  padding-top: 5rem;
}
</style>

<template>
  <section class="main-explore-wrap">
    <h1>{{title}}</h1>
  </section>
</template>

<script>
import { inject, ref } from 'vue'
export default {
  setup() {
    const title = ref('explore');
    const $axios = inject('$axios');

    // $axios.get('/v7/weather/now', {
    //   params: {
    //     location: 101010100
    //   }
    // }).then(res => {
    //   console.log(res.data);
    // }).catch(e => console.log(e))

    return {
      title
    }
  }
}
</script>

