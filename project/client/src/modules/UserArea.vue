<template>
  <main class="user-area">
    <AsideMenu />

    <section class="user-area__view">
      <router-view name="userAreaView"></router-view>
    </section>
  </main>
</template>

<script>
import AsideMenu from './AsideMenu.vue'

export default {
  name: "UserArea",

  components: {
    AsideMenu
  }
}
</script>

<style scoped>
.user-area {
  display: flex;
}

.user-area__view {
  margin-left: 230px;
}
</style>