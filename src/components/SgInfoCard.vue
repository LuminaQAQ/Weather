<template>
  <div class="sg-weather-info-card">
    <i :class="item.icon"></i>
    <section class="info-desc">{{item.title}}</section>

    <template v-if="weatherData">
      <section class="info-text">
        <span class="info-num">
          {{weatherData[item.desc] !== '' ?  weatherData[item.desc] : '暂无数据'}}
        </span>
        <span class="info-unit">{{weatherData[item.desc] !== ''  && item.unit ?  item.unit : ''}}</span>
      </section>
    </template>
  </div>
</template>

<script setup>
const { item, weatherData, row } = defineProps(['item', 'weatherData']);
</script>

<style lang="scss" scoped>
.sg-weather-info-card {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  &.row {
    width: 100%;
  }

  margin: 1rem 0;

  flex: 1 0 5rem;
  max-width: 5rem;
  width: 5rem;
  height: 6.5rem;

  font-size: 0.8rem;

  i {
    font-size: 1.1rem;
  }

  .info-text {
    .info-num {
      font-size: 1.25rem;
    }
  }
}
</style>