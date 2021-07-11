<template>
  <section class="add-contact">
    <header class="add-contact__header">
      <h1 class="add-contact__title">
        <i class="fas fa-plus-square add-contact__title-icon"></i>
        Adicionar Contato
      </h1>
    </header>

    <form class="add-contact-form">
      <InputForm
        label="Nome"
        inputMode="inverted"
        inputId="Nome"
        inputMaxLength="30"
        :error-value="errors.name"
        error-name="name"
        :error-options="currentClient && currentClient.contactFormOptions.errors.name"
        :value-format-options="currentClient && currentClient.contactFormOptions.format.name"
        @change-error-value="changeErrorValue"
        v-model="form.name"
      />

      <InputForm
        inputMode="inverted"
        label="Celular"
        inputId="Celular"
        :inputMaxLength="currentClient && currentClient.contactFormOptions.errors.cellphone.max"
        :error-value="errors.cellphone"
        error-name="cellphone"
        :error-options="currentClient && currentClient.contactFormOptions.errors.cellphone"
        :value-format-options="currentClient && currentClient.contactFormOptions.format.cellphone"
        @change-error-value="changeErrorValue"
        v-model="form.cellphone"
      />

      <section class="add-contact-form__btn-group">
        <Button
          buttonText="Adicionar"
          buttonType="submit"
          buttonIcon="fas fa-plus-square"
          @clickEvent="addContact"
          :disabled="!formHasNoErrors || someFormInputsIsEmpty"
        />
      </section>
    </form>
  </section>
</template>

<script>
import InputForm from  './components/InputForm.vue'
import Button from './components/Button.vue'
import { mapGetters, mapMutations } from 'vuex'
import Request from '../helpers/Request'

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

      errors: {
        name: false,
        cellphone: false
      }
    }
  },

  computed: {
    ...mapGetters(['currentClient']),

    someFormInputsIsEmpty() {
      return Object.entries(this.form).some(([prop, value]) => !value)
    },

    formHasNoErrors() {
      return Object.entries(this.errors).every(([prop, value]) => !value)
    }
  },

  methods: {
    ...mapMutations(['OPEN_NOTIFICATION']),

    changeErrorValue(errorName, errorValue) {
      this.errors[errorName] = errorValue
    },
    
    async addContact() {
      if (this.formHasNoErrors && !this.someFormInputsIsEmpty) {
        const responseData = await Request(
          'http://localhost:5000/api/contact',
          'POST',
          this.form,
          true
        )

        if (responseData.status === 'success') {
          this.form = {
            name: '',
            cellphone: ''
          }
        }

        this.OPEN_NOTIFICATION({
          status: responseData.status,
          show: true,
          message: responseData.message
        })
      }
    }
  }
}
</script>

<style scoped>
.add-contact {
  display: flex;
  flex-flow: column nowrap;
  margin: 1.5em 0 1.5em 1em;
  width: 400px;
}

.add-contact__title {
  margin: 0 0 .7em 0;
  font-size: 18pt;
}

.add-contact-form__btn-group {
  margin-top: .1em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>