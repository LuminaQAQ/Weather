<style lang="scss" scoped>
@import "../assets/style/index.scss";
@import "../assets/style/icon.scss";

.nav-wrap {
  @include flex-center;
  z-index: 100;

  user-select: none;

  text-shadow: 0 3px 4px rgba(0, 0, 0, 0.5);

  position: fixed;

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

  .search-container {
    position: fixed;
    left: 0;
    top: 0;

    width: 100%;
    height: 100%;

    .search-wrap {
      z-index: 999;

      display: flex;
      align-items: center;
      justify-content: end;

      margin: 1rem;
      margin-bottom: 0;

      ::v-deep(.el-input__wrapper) {
        background-color: #333333;
        box-shadow: none;
        color: white;
      }

      i {
        margin-left: 1rem;
        font-size: 1.5rem;
        color: white;
      }
    }

    .city-list-wrap {
      box-sizing: border-box;
      margin-left: auto;
      margin-right: 1rem;
      padding: 0;

      width: 100%;
      max-width: 28rem;
      padding-top: 0.25rem;

      overflow-y: auto;
      user-select: none;
      scrollbar-width: none;
    }

    .search-mask {
      z-index: -1;
      position: fixed;
      left: 0;
      top: 0;

      width: 100%;
      height: 100%;

      background-color: rgba(0, 0, 0, 0.7);
    }
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
    <span
      class="search-icon"
      active-class="active-link"
      @click="openSearchWrap"
    />
    <!-- #endregion  -->
    <!------- end ------->

    <!------- 探索 ------->
    <!-- #region  -->
    <router-link
      to="/explore"
      class="explore-icon"
      active-class="active-link"
    />
    <!-- #endregion  -->
    <!------- end ------->

    <!------- 搜索框 ------->
    <!-- #region  -->
    <section
      class="search-container"
      v-if="isSearch"
    >
      <div class="search-wrap">
        <el-input
          class="el-search-wrap"
          style="width: 28rem;"
          size="large"
          placeholder="发现美好天气"
          v-model="searchKeyword"
          :suffix-icon="Search"
          @keyup="searchHandler"
        />
      </div>

      <section class="city-list-wrap">
        <sg-search-res-item
          v-for="(item, index) in  searchCity.cityList"
          :key="index"
          :value='item'
        />
      </section>

      <div
        class="search-mask"
        @click="closeSearchWrap"
      ></div>
    </section>
    <!-- #endregion  -->
    <!------- end ------->
  </nav>
</template>

<script setup>
import { inject, reactive, ref } from "vue";
import { Search } from '@element-plus/icons-vue'
import { useLocationStore } from "@/stores/location";
import axios from "axios";
import SgSearchResItem from "./SgSearchResItem.vue";

const getLocation = useLocationStore();

let searchCity = reactive({
  cityList: []
});


// ------- 搜索 -------
// #region
let isSearch = ref(false); // 遮罩
let searchKeyword = ref('');  // 搜索词
let searchFlag = true;  // 节流阀
let timer = null; // 定时器

// 关闭搜素
const closeSearchWrap = (e) => {
  isSearch.value = false;
  searchKeyword.value = '';
}

// 开启搜索
const openSearchWrap = (e) => {
  isSearch.value = true;
  searchKeyword.value = '';
}

// 搜索功能
const searchHandler = (e) => {
  if (e.target.value.trim() === "") return false;
  if (searchFlag) {
    searchFlag = false;
    clearTimeout(timer);

    axios.get('https://geoapi.qweather.com/v2/city/lookup', {
      params: {
        key: 'a36fd62bc2da4c099f2893fc9c276c71',
        location: searchKeyword.value.trim(),
      }
    })
      .then(res => {
        const citys = res.data.location || [];

        console.log(res.data);

        searchCity.cityList = citys;
      })
      .catch(e => console.log(e))
  }

  timer = setTimeout(() => {
    searchFlag = true;
  }, 1000);
}
// #endregion
// ------- end -------

</script>
