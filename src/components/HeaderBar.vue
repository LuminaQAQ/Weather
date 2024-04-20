<style lang="scss" scoped>
@import "../assets/style/index.scss";
@import "../assets/style/icon.scss";

.nav-wrap {
  @include flex-center;
  z-index: 100;

  text-shadow: 0 3px 4px rgba(0, 0, 0, 0.5);

  position: absolute;

  box-sizing: border-box;
  width: 100%;
  padding: 1rem 0.5rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    z-index: -1;

    width: 100%;
    height: 100%;

    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.05)
    );

    filter: blur(3px);
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.5);
  }

  .website-favicon-wrap {
    @include flex-center;
    justify-content: center;
    flex: 1 0 auto;

    text-decoration: none;

    .website-name {
      font-size: 1.5rem;
      line-height: 1.5;
      font-weight: 800;
      color: #ffffff;
    }
  }

  .placeholder {
    width: 0;
    height: 0;
  }
}
</style>

<template>
  <nav class="nav-wrap">
    <!------- nav导航图标 ------->
    <!-- #region  -->
    <section class="mobile-nav-button-wrap">
      <section class="mobile-nav-icon" />
    </section>
    <!-- #endregion  -->
    <!------- end ------->

    <!------- 网站名和图标 ------->
    <!-- #region  -->
    <router-link
      to="/home"
      class="website-favicon-wrap"
    >
      <section class="favicon-icon" />
      <span class="website-name">洛霖的气象站</span>
    </router-link>
    <!-- #endregion  -->
    <!------- end ------->

    <!------- 搜索 ------->
    <!-- #region  -->
    <router-link
      to="/explore"
      class="search-icon"
      active-class="active-link"
    />
    <!-- #endregion  -->
    <!------- end ------->

    <!------- 探索 ------->
    <!-- #region  -->
    <router-link
      to="/search"
      class="explore-icon"
      active-class="active-link"
    />
    <!-- #endregion  -->
    <!------- end ------->

    <span class="placeholder"></span>
  </nav>
</template>

<script>
export default {
  setup() {

  }
}
</script>
