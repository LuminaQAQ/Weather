<style lang="scss" scoped>
@import "@/assets/style/icon.scss";
.footer-wrap {
  background-color: #222222;
  padding: 1rem;
  border-top: 1px solid rgb(83, 83, 83);
  color: white;
  text-align: center;

  .site-project-name {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-right: 1.5rem;
  }

  .favicon-icon {
    width: 2rem;
    height: 2rem;
  }

  .site-desc {
    margin-bottom: 1rem;
    color: gray;
  }
}
</style>

<template>
  <footer class="footer-wrap">
    <div class="site-project-name">
      <section class="favicon-icon"></section>
      洛霖的气象站
    </div>
    <section class="site-desc">
      <br>
      <div style="color: gray">©Copyright 2024 by 洛霖</div>
      <div>version: 0.0.1</div>
    </section>
  </footer>
</template>

<script>
export default {
  setup() {

  }
}
</script>
