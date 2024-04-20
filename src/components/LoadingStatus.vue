<style lang="scss" scoped>
@import "../assets/style/index.scss";

.loading-wrap {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;

  width: 100%;
  height: 100%;

  background-color: aliceblue;

  .loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .favicon-icon {
      @include common-icon(
        5rem,
        "@/assets/img/favicon.png",
        "@/assets/img/favicon.png"
      );

      animation: img-rotate 1.5s infinite forwards;
    }

    .text {
      display: flex;
      font-size: 1.5rem;
      font-weight: 900;
      transform: translateX(-20%);
      margin-top: 1.5rem;

      .balls-wrap {
        position: relative;
        @for $i from 1 through 3 {
          .ball#{$i} {
            position: absolute;
            top: 0;
            left: 1.5rem * $i;
            width: 1rem;
            height: 1rem;
            border-radius: 50%;

            background-color: rgb(82, 82, 82);

            animation: ball-jump 1s infinite;

            animation-delay: $i * 0.1s;
          }
        }
      }
    }
  }

  @keyframes ball-jump {
    50% {
      top: 0.5rem;
    }
  }

  @keyframes img-rotate {
    100% {
      rotate: 360deg;
    }
  }
}
</style>

<template>
  <section class="loading-wrap">
    <section class="loading">
      <section class="img favicon-icon" />

      <!------- 文字 + 图片 ------->
      <!-- #region  -->
      <section class="text">
        <span>加载中</span>
        <section class="balls-wrap">
          <section
            v-for="item in 3"
            :key="item"
            :class="`ball${item}`"
          />
        </section>
      </section>
      <!-- #endregion  -->
      <!------- end ------->
    </section>
  </section>
</template>

<script>
export default {

}
</script>