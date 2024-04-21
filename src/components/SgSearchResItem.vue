<style lang="scss" scoped>
.sg-city-item {
  background-color: #333333;
  padding: 1rem;
  color: rgb(220, 220, 220);
  font-size: 1.15rem;
  line-height: 1.15;

  display: flex;
  align-items: center;

  i {
    font-size: 1.15rem;
    line-height: 1.15;
  }

  .el-icon:nth-child(1) {
    margin-right: 1rem;
  }

  .city-entire-name {
    flex: 1 0 auto;
  }
}
</style>

<template>
  <section
    class="sg-city-item"
    @click="changeCurCity"
  >
    <el-icon>
      <Location />
    </el-icon>

    <div class="city-entire-name">
      <span>{{`${value.name}, ${value.adm1}, ${value.country}`}}</span>
    </div>

  </section>
</template>

<script setup>
import { computed, getCurrentInstance, nextTick } from "vue";
import { useRouter } from "vue-router";


const { value } = defineProps(['value']);
const $router = useRouter();

const cityLocation = computed(() => {
  const loc = `${Number(value.lon).toFixed(2)},${Number(value.lat).toFixed(2)}`;
  const city = value.name + ', ' + value.adm2 + ', ' + value.adm1;

  return { loc, city };
});


function changeCurCity() {
  window.localStorage.setItem('loc', cityLocation.value.loc);
  window.localStorage.setItem('city', cityLocation.value.city);
  location.reload();
}

</script>