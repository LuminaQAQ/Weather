<template>
  <section class="sunrise-sunset-wrap">
    <section class="sun-border">

      <span class="sun-point1">&lt;</span>
      <span class="sun-point2">&lt;</span>
      <span class="sun-point3">&lt;</span>

      <span class="sunrise-desc">
        <i :class="desc.start.icon"></i>
        {{desc.start.desc}}
        <br>
        {{data[desc.start.time]}}
      </span>
      <span class="sunset-desc">
        <i :class="desc.end.icon"></i>
        {{desc.end.desc}}
        <br>
        {{data[desc.end.time]}}
      </span>
    </section>
  </section>
</template>

<script setup>
const { data, desc } = defineProps(['data', 'desc']);
</script>

<style lang="scss" scoped>
.sunrise-sunset-wrap {
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   flex-direction: column;

  width: 100%;
  overflow: hidden;
  height: 10rem;

  .sun-border {
    position: relative;
    box-sizing: border-box;
    max-width: 20rem;
    width: 15rem;
    height: 15rem;
    margin: 0 auto;

    border: 2px solid #ccc;
    border-radius: 50%;

    transform: translateY(17%);

    .sun-point1,
    .sun-point2,
    .sun-point3 {
      position: absolute;
      font-weight: 900;
      transform-origin: 50% 50%;

      transform: translate(-50%, -50%) rotate(180deg);
    }

    .sun-point1 {
      left: 1rem;
      top: 25%;
      transform: translate(-50%, -50%) rotate(125deg);
    }

    .sun-point2 {
      left: 50%;
      top: 0;
      transform: translate(-50%, -50%) rotate(180deg);
    }

    .sun-point3 {
      right: 0.25rem;
      top: 25%;
      transform: translate(-50%, -50%) rotate(225deg);
    }

    .sunrise-desc,
    .sunset-desc {
      position: absolute;
      bottom: 50%;
      background-color: #373737;
      text-align: center;
    }

    .sunrise-desc {
      content: "日出";
      left: -1rem;
    }

    .sunset-desc {
      content: "日落";
      right: -1rem;
    }
  }
}
</style>