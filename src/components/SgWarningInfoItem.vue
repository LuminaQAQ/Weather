<template>
  <section class="warning-wrap">
    <header class="warning-header">
      <section class="warning-type-icon">
        <i :class="`qi-${value.type}`"></i>
      </section>
      <section class="warning-desc">
        <h4 class="warning-title">{{value.title}}</h4>
        <span class="warning-pubTime">发布日期: {{value.pubTime}}</span>
      </section>
    </header>

    <footer class="warning-text">
      {{value.text}}
    </footer>
  </section>
</template>

<script setup>
const { value } = defineProps(['value']);
</script>

<style lang="scss" scoped>
.warning-wrap {
  margin-bottom: 1rem;
  .warning-header {
    display: flex;
    align-items: flex-start;

    margin-bottom: 1rem;

    .warning-type-icon {
      margin: 0 1rem 1rem 0;
      i {
        font-size: 3rem;
        width: 3rem;
        height: 3rem;
      }
    }

    .warning-desc {
      .warning-title {
        margin: 0.25rem 0;
      }

      .warning-pubTime {
        font-size: 0.75rem;
        color: #ccc;
      }
    }
  }
}
</style>