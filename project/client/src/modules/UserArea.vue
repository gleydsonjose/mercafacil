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
import { mapActions } from 'vuex'

export default {
  name: "UserArea",

  components: {
    AsideMenu
  },

  mounted() {
    this.getAllContacts()
  },

  methods: {
    ...mapActions(['getAllContacts'])
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