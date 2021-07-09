<template>
  <section class="add-contact">
    <header class="contacts__header">
      <h1 class="contacts__title">Adicionar Contatos</h1>
    </header>

    <form class="add-contact-form">
      <InputForm
        label="Nome"
        inputMode="inverted"
        inputId="Nome"
        v-model="form.name"
      />

      <InputForm
        inputMode="inverted"
        label="Celular"
        inputId="Celular"
        v-model="form.cellphone"
      />

      <section class="add-contact-form__btn-group">
        <Button
          buttonText="Adicionar"
          buttonType="submit"
          @clickEvent="addContact"
        />
      </section>
    </form>
  </section>
</template>

<script>
import InputForm from  './components/InputForm.vue'
import Button from './components/Button.vue'

export default {
  name: 'AddContact',

  components: {
    InputForm,
    Button
  },

  data() {
    return {
      form: {
        name: '',
        cellphone: ''
      },
    }
  },

  methods: {
    addContact() {
      console.log('Adicionando contatos')
    }
  }
}
</script>

<style scoped>
.add-contact {
  display: flex;
  flex-flow: column nowrap;
  margin: 1.5em 0 0 1em;
  width: 400px;
}

.add-contact-form__btn-group {
  margin-top: .1em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>