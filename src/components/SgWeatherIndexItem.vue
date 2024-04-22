<style lang="scss" scoped>
.sg-weather-index-wrap {
  margin: 1rem 0;
  padding: 1rem;
  background-color: #3e3e3e;
  border-radius: 16px;

  .header-wrap {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    .sg-weather-index-img {
      width: 3rem;
      height: 3rem;
      margin-right: 1rem;

      object-fit: cover;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .desc-wrap {
      .title {
        font-size: 1.1rem;
      }
      .level {
        font-size: 0.9rem;
        color: #a8a8a8;
      }
    }
  }
}
</style>

<template>
  <section class="sg-weather-index-wrap">
    <header class="header-wrap">

      <!--  -->
      <section class="sg-weather-index-img">
        <img :src="getAssetsFile(`WeatherIndex/${value.type}.png`)">
      </section>

      <!--  -->
      <section class="desc-wrap">
        <section class="title">{{value.name}}</section>
        <section class="level">{{type[value.level]}}</section>
      </section>

    </header>

    <footer class="">{{value.text}}</footer>

  </section>
</template>

<script setup>
import { getAssetsFile } from '@/utils/handleImgFile.js'

const { value } = defineProps(['value', 'type']);

</script>
