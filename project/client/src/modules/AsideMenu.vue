<template>
  <nav class="aside-menu">
    <header class="aside-menu__header">
      <h1 class="aside-menu__header-title">Bem vindo *Login*</h1>
      <h2 class="aside-menu__header-subtitle">Cliente 2</h2>
    </header>

    <ul class="aside-menu__btn-group">
      <li class="aside-menu__btn" @click="goToContacts">Contatos</li>
      <li class="aside-menu__btn" @click="goToAddContact">Adicionar Contato</li>
      <li class="aside-menu__btn" @click="logout">Sair</li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'MenuLateral',

  methods: {
    goToContacts() {
      this.$router.push({ name: 'contacts' })
    },

    goToAddContact() {
      this.$router.push({ name: 'add-contact' })
    },

    logout() {
      console.log('Deslogando')
    }
  }
}
</script>

<style scoped>
.aside-menu {
  display: flex;
  flex-flow: column nowrap;
  background-image: linear-gradient(to bottom right, var(--dark-blue), var(--light-dark-blue), var(--light-blue));
  width: 100%;
  max-width: 230px;
  height: 100vh;
  position: fixed;
  box-shadow: 1px 0 3px var(--black);
}

.aside-menu__header {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 1em 0;
}

.aside-menu__header-title {
  font-size: 13pt;
  color: var(--white);
  margin: .7em;
}

.aside-menu__header-subtitle {
  font-size: 11pt;
  margin: 0;
  color: var(--green-light);
}

.aside-menu__btn-group {
  list-style-type: none;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
  padding: 0;
}

.aside-menu__btn {
  cursor: pointer;
  background-color: var(--white);
  color: var(--black);
  text-align: center;
  padding: .6em 0;
  margin-bottom: 2px;
  width: 100%;
  font-size: 11pt;
  transition: .15s background-color ease-in;
}

.aside-menu__btn:hover {
  background-color: var(--dark-white);
}
</style>