<template>
  <main class="login">
    <form class="login-form">
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

      <section class="login-form__btn-group">
        <Button
          buttonStyle="outline"
          buttonText="Ainda não tem uma conta?"
          buttonIcon="fas fa-user-plus"
          @clickEvent="goToRegisterArea"
        />

        <Button
          buttonText="Entrar"
          buttonType="submit"
          buttonIcon="fas fa-sign-in-alt"
          @clickEvent="login"
          :disabled="!formHasNoErrors || someFormInputsIsEmpty"
        />
      </section>
    </form>
  </main>
</template>

<script>
import InputForm from  './components/InputForm.vue'
import Button from './components/Button.vue'
import SelectForm from  './components/SelectForm.vue'
import { mapState, mapMutations } from 'vuex'
import Request from '../helpers/Request'

export default {
  name: 'Login',

  components: {
    InputForm,
    SelectForm,
    Button
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params?.user) {
        vm.form = to.params.user
      }
    })
  },

  data() {
    return {
      form: {
        login: '',
        password: '',
        id_client: ''
      },

      errors: {
        login: false,
        password: false,
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
    ...mapMutations(['OPEN_NOTIFICATION', 'SET_USER_IS_AUTHENTICATED']),

    changeErrorValue(errorName, errorValue) {
      this.errors[errorName] = errorValue
    },

    goToRegisterArea() {
      this.$router.push({ name: 'register' })
    },

    goToUserArea() {
      this.$router.push({ name: 'contacts' })
    },

    async login() {
      if (this.formHasNoErrors && !this.someFormInputsIsEmpty) {
        const responseData = await Request(
          'http://localhost:5000/api/user/login',
          'POST',
          this.form,
          false
        )

        if (responseData.status === 'success') {
          sessionStorage.setItem('token', responseData.data.token)
          this.SET_USER_IS_AUTHENTICATED(true)

          this.goToUserArea()
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
.login {
  background-image: linear-gradient(to bottom right, var(--dark-blue), var(--light-dark-blue), var(--light-blue));
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  max-width: 340px;
}

.login-form__btn-group {
  margin-top: 1.3em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
