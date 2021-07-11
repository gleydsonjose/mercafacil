<template>
  <nav class="aside-menu">
    <header class="aside-menu__header">
      <h1 class="aside-menu__header-title">
        <i class="fas fa-shopping-basket aside-menu__header-title-icon"></i>
        {{ currentClient.description }}
      </h1>
      <h2 class="aside-menu__header-subtitle">
        <i class="fas fa-user aside-menu__header-subtitle-icon"></i>
        Bem vindo {{ getUserDataFromSession.login }}
      </h2>
    </header>

    <ul class="aside-menu__btn-group">
      <li
        class="aside-menu__btn"
        :class="{'aside-menu__btn--active': current_active_menu_item === 'contacts'}"
        @click="goToContacts"
      >
        <i class="fas fa-th-list aside-menu__btn-icon"></i>
        Contatos
      </li>
      <li
        class="aside-menu__btn"
        :class="{'aside-menu__btn--active': current_active_menu_item === 'add-contact'}"
        @click="goToAddContact"
      >
        <i class="fas fa-plus-square aside-menu__btn-icon"></i>
        Adicionar Contato
      </li>
      <li class="aside-menu__btn" @click="logout">
        <i class="fas fa-sign-out-alt aside-menu__btn-icon"></i>
        Sair
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'AsideMenu',

  props: {
    user: {
      type: Object,
      default: () => ({
        login: '',
        id_client: ''
      }),
      required: false
    }
  },

  computed: {
    ...mapState(['clients', 'current_active_menu_item']),
    ...mapGetters(['getUserDataFromSession', 'currentClient']),
  },

  methods: {
    ...mapMutations([
      'SET_CONTACTS',
      'SET_CURRENT_ACTIVE_MENU_ITEM',
      'OPEN_NOTIFICATION',
      'SET_USER_IS_AUTHENTICATED'
    ]),

    goToContacts() {
      if (this.$route.name !== 'contacts') {
        this.SET_CURRENT_ACTIVE_MENU_ITEM('contacts')
        this.$router.push({ name: 'contacts' })
      }
    },

    goToAddContact() {
      if (this.$route.name !== 'add-contact') {
        this.SET_CURRENT_ACTIVE_MENU_ITEM('add-contact')
        this.$router.push({ name: 'add-contact' })
      }
    },

    logout() {
      sessionStorage.clear()

      this.SET_CONTACTS([])
      this.SET_CURRENT_ACTIVE_MENU_ITEM('')
      this.SET_USER_IS_AUTHENTICATED(false)
      
      this.$router.replace({ name: 'login' })

      this.OPEN_NOTIFICATION({
        status: 'success',
        show: true,
        message: 'Usuário foi deslogado com sucesso'
      })
    }
  }
}
</script>

<style scoped>
.aside-menu {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  background-color: var(--black);
  width: 100%;
  max-width: 230px;
  height: 100%;
  position: fixed;
  box-shadow: 2px 0 3px var(--dark-white);
}

.aside-menu__header {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
}

.aside-menu__header-title {
  font-size: 11.5pt;
  color: var(--black);
  margin: 0;
  background-color: var(--white);
  width: 100%;
  text-align: center;
  padding: .3em 0;
}

.aside-menu__header-subtitle {
  font-size: 10pt;
  margin: 0;
  color: var(--light-green);
  padding: 1.6em 0;
}

.aside-menu__header-subtitle-icon {
  margin-right: .2em;
}

.aside-menu__btn-group {
  list-style-type: none;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  width: 100%;
  padding: 0;
  margin: 0;
}

.aside-menu__btn {
  cursor: pointer;
  background-color: var(--light-blue);
  color: var(--white);
  padding: .8em 0;
  margin-bottom: 2px;
  font-size: 11pt;
  transition: .15s background-color ease-in, .15s color ease-in;
  text-transform: uppercase;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.aside-menu__btn--active {
  background-color: var(--white);
  color: var(--black);
}

.aside-menu__btn:hover {
  background-color: var(--white);
  color: var(--black);
}

.aside-menu__btn-icon {
  margin: 0 .3em 0 1em;
}
</style>