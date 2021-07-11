<template>
  <section class="contacts">
    <header class="contacts__header">
      <h1 class="contacts__title">
        <i class="fas fa-th-list contacts__title-icon"></i>
        Contatos
      </h1>
    </header>

    <table class="contacts__table">
      <thead class="contacts__thead">
        <tr class="contacts__tr-head">
          <th class="contacts__th">Nome</th>
          <th class="contacts__th">Celular</th>
          <th class="contacts__th">Editar</th>
          <th class="contacts__th">Excluir</th>
        </tr>
      </thead>

      <tbody class="contacts__tbody">
        <template v-if="contacts.length">
          <tr
            class="contacts__tr-body"
            v-for="contact in contacts"
            :key="contact.id"
          >
            <td class="contacts__td">
              {{ contact.name }}
            </td>
            <td class="contacts__td">
              {{ contact.cellphone }}
            </td>
            <td class="contacts__td" @click="goToEditContact(contact.id)">
              <i class="fas fa-pen-square contacts__edit-icon"></i>
            </td>
            <td class="contacts__td" @click="deleteContact(contact.id)">
              <i class="fas fa-window-close contacts__delete-icon"></i>
            </td>
          </tr>
        </template>

        <tr class="contacts__tr-body" v-else>
          <td class="contacts__td" colspan="2">
            Não há contatos cadastrados
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import Request from '../helpers/Request'

export default {
  name: 'Contacts',

  computed: {
    ...mapState(['contacts']),
    ...mapGetters(['getUserDataFromSession'])
  },

  methods: {
    ...mapMutations([
      'OPEN_NOTIFICATION',
      'DELETE_CONTACT',
      'SET_CURRENT_ACTIVE_MENU_ITEM'
    ]),

    goToEditContact(id) {
      this.SET_CURRENT_ACTIVE_MENU_ITEM('')
      this.$router.push({ name: 'edit-contact', params: { id } })
    },

    async deleteContact(id) {
      const responseData = await Request(
        `http://localhost:5000/api/contact/${id}`,
        'DELETE',
        null,
        true
      )

      if (responseData.status === 'success') {
        this.DELETE_CONTACT({ id })
      }

      this.OPEN_NOTIFICATION({
        status: responseData.status,
        show: true,
        message: responseData.message
      })
    }
  }
}
</script>

<style scoped>
.contacts {
  display: flex;
  flex-flow: column nowrap;
  margin: 1.5em 0 1.5em 1em;
  width: 700px;
}

.contacts__title {
  margin: 0 0 .7em 0;
  font-size: 18pt;
}

.contacts__table, .contacts__td {
  border: 1px solid var(--dark-white);
  border-collapse: collapse;
}

.contacts__th, .contacts__td {
  padding: .6em;
  text-align: center;
}

.contacts__th {
  border: 1px solid var(--black);
  background-color: var(--black);
  color: var(--white);
  border-collapse: collapse;
}

.contacts__edit-icon {
  cursor: pointer;
  color: var(--green);
  transition: .15s color ease-in;
}

.contacts__edit-icon:hover {
  color: var(--dark-green);
}

.contacts__delete-icon {
  cursor: pointer;
  color: var(--red);
  transition: .15s color ease-in;
}

.contacts__delete-icon:hover {
  color: var(--dark-red);
}
</style>