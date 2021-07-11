<template>
  <section class="edit-contact">
    <header class="edit-contact__header">
      <h1 class="edit-contact__title">
        <i class="fas fa-pen-square edit-contact__title-icon"></i>
        Editar Contato
      </h1>
    </header>

    <form class="edit-contact-form">
      <InputForm
        label="Nome"
        inputMode="inverted"
        inputId="Nome"
        inputMaxLength="30"
        :error-value="errors.name"
        error-name="name"
        :error-options="currentClient.contactFormOptions.errors.name"
        :value-format-options="currentClient.contactFormOptions.format.name"
        @change-error-value="changeErrorValue"
        v-model="form.name"
      />

      <InputForm
        inputMode="inverted"
        label="Celular"
        inputId="Celular"
        inputMaxLength="19"
        :error-value="errors.cellphone"
        error-name="cellphone"
        :error-options="currentClient.contactFormOptions.errors.cellphone"
        :value-format-options="currentClient.contactFormOptions.format.cellphone"
        @change-error-value="changeErrorValue"
        v-model="form.cellphone"
      />

      <section class="edit-contact-form__btn-group">
        <Button
          buttonText="Editar"
          buttonType="submit"
          buttonIcon="fas fa-pen-square"
          @clickEvent="editContact"
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
  name: 'EditContact',

  components: {
    InputForm,
    Button
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getContact(to.params.id)
    })
  },

  data() {
    return {
      form: {
        id: 0,
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
    ...mapMutations(['OPEN_NOTIFICATION', 'UPDATE_CONTACT']),

    changeErrorValue(errorName, errorValue) {
      this.errors[errorName] = errorValue
    },

    async getContact(id) {
      const responseData = await Request(
        `http://localhost:5000/api/contact/${id}`,
        'GET',
        null,
        true
      )

      if (!Object.keys(responseData.data).length) {
        this.$router.replace({ name: 'contacts' })
      }

      if (responseData.status === 'success') {
        this.form = {
          id: responseData.data.contact.id,
          name: responseData.data.contact.name,
          cellphone: responseData.data.contact.cellphone
        }
      }

      if (responseData?.message) {
        this.OPEN_NOTIFICATION({
          status: responseData.status,
          show: true,
          message: responseData.message
        })
      }
    },
    
    async editContact() {
      if (this.formHasNoErrors && !this.someFormInputsIsEmpty) {
        const responseData = await Request(
          'http://localhost:5000/api/contact',
          'PUT',
          this.form,
          true
        )

        if (responseData.status === 'success') {
          this.UPDATE_CONTACT(responseData.data.contact)
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
.edit-contact {
  display: flex;
  flex-flow: column nowrap;
  margin: 1.5em 0 1.5em 1em;
  width: 400px;
}

.edit-contact__title {
  margin: 0 0 .7em 0;
  font-size: 18pt;
}

.edit-contact-form__btn-group {
  margin-top: .1em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>