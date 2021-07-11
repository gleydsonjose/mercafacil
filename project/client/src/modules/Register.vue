<template>
  <main class="register">
    <form class="register-form">
      <InputForm
        label="Login"
        inputId="Login"
        :error-value="errors.login"
        error-name="login"
        :error-options="{ required: true, min: 4, max: 30 }"
        @change-error-value="changeErrorValue"
        v-model="form.login"
      />

      <InputForm
        label="Senha"
        inputId="Password"
        inputType="password"
        :error-value="errors.password"
        error-name="password"
        :error-options="{ required: true, min: 6, max: 30 }"
        @change-error-value="changeErrorValue"
        v-model="form.password"
      />

      <InputForm
        label="Confirmar Senha"
        inputId="ConfirmPassword"
        inputType="password"
        :error-value="errors.confirmPassword"
        error-name="confirmPassword"
        :error-options="{ required: true, equal: form.password }"
        @change-error-value="changeErrorValue"
        v-model="form.confirmPassword"
      />

      <SelectForm
        label="Cliente"
        selectId="Cliente"
        :error-value="errors.id_client"
        error-name="id_client"
        :error-options="{ required: true }"
        @change-error-value="changeErrorValue"
        v-model="form.id_client"
        :options="clientsSelectOptions"
      />

      <section class="register-form__btn-group">
        <Button
          buttonText="Cadastrar"
          buttonType="submit"
          buttonIcon="fas fa-user-plus"
          @clickEvent="register"
          :disabled="!formHasNoErrors || someFormInputsIsEmpty"
        />
      </section>
    </form>
  </main>
</template>

<script>
import InputForm from  './components/InputForm.vue'
import SelectForm from  './components/SelectForm.vue'
import Button from './components/Button.vue'
import { mapState, mapMutations } from 'vuex'
import Request from '../helpers/Request'

export default {
  name: 'Register',

  components: {
    InputForm,
    SelectForm,
    Button
  },

  data() {
    return {
      form: {
        login: '',
        password: '',
        confirmPassword: '',
        id_client: ''
      },

      errors: {
        login: false,
        password: false,
        confirmPassword: false,
        id_client: false
      }
    }
  },

  computed: {
    ...mapState(['clients']),

    clientsSelectOptions() {
      return this.clients.map((client) => ({
        id: client.id,
        text: client.description,
        value: client.id
      }))
    },

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

    goToLoginArea(user) {
      this.$router.push({ name: 'login', params: { user } })
    },

    async register() {
      if (this.formHasNoErrors && !this.someFormInputsIsEmpty) {
        const responseData = await Request(
          'http://localhost:5000/api/user/register',
          'POST',
          this.form,
          false
        )

        if (responseData.status === 'success') {
          const data = {
            login: this.form.login,
            password: this.form.password,
            id_client: this.form.id_client
          }

          this.goToLoginArea(data)
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
.register {
  background-image: linear-gradient(to bottom right, var(--dark-blue), var(--light-dark-blue), var(--light-blue));
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-form {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  max-width: 340px;
}

.register-form__btn-group {
  margin-top: .1em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
