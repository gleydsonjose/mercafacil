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
import { mapActions, mapMutations } from 'vuex'

export default {
  name: "UserArea",

  beforeRouteEnter(to, from, next) {
    const token = sessionStorage.getItem('token')

    if (token) {
      next(vm => {
        vm.SET_USER_IS_AUTHENTICATED(true)
      })
    }
  },

  components: {
    AsideMenu
  },

  mounted() {
    this.getAllContacts()
  },

  methods: {
    ...mapMutations(['SET_USER_IS_AUTHENTICATED']),
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