<style lang="scss" scoped>
@import "@/assets/style/index.scss";

.weather-category-card {
  box-sizing: border-box;
  background-color: $dark-card-color;
  border-radius: 8px;
  padding: 1rem;
  margin: 2rem 1rem;

  .title {
    font-size: 1rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  .type-options-wrap {
    display: flex;
    font-size: 0.55rem;
    margin-top: 1rem;

    .sg-type-option {
      padding: 0.5rem;
      border-radius: 999px;
      background-color: #676767;
      margin: 0 0.25rem;
      cursor: pointer;

      &.active {
        background-color: #3ea1ee;
      }
    }
  }

  .link {
    display: block;
    padding: 1rem;
  }
}
</style>

<template>
  <section class="weather-category-card">

    <!------- 标题 ------->
    <!-- #region  -->
    <section class="title">
      <i class="qi-100"></i>
      {{title}}
    </section>
    <!-- #endregion  -->
    <!------- end ------->

    <!------- 图表 ------->
    <!-- #region  -->
    <section class="weather-charts-wrap">
      <slot name="chart"></slot>
    </section>
    <!-- #endregion  -->
    <!------- end ------->

    <!------- tab栏 ------->
    <!-- #region  -->
    <section class="type-options-wrap">
      <section
        v-for="(item, index) in tab"
        :key="index"
        :class="{ active: index == activeTab, 'sg-type-option': true }"
        @click="changeChart(item.flag, index)"
      >
        {{item.text}}
      </section>
    </section>
    <!-- #endregion  -->
    <!------- end ------->

    <!------- 更多(链接跳转) ------->
    <!-- #region  -->

    <!-- <section>
      <slot name="link">
        <router-link></router-link>
      </slot>
    </section> -->
    <!-- #endregion  -->
    <!------- end ------->

  </section>
</template>

<script>
import { ref } from 'vue'

export default {
  props: ['title', 'tab'],
  emits: ['changeChart'],
  setup(props, context) {
    let activeTab = ref(0);

    const changeChart = (flag, index) => {
      activeTab.value = index;
      context.emit('changeChart', flag, index);
    }

    return {
      activeTab,
      changeChart
    }
  }
}
</script>

