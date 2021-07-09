<template>
  <main class="login">
    <form class="login-form">
      <InputForm
        label="Login"
        inputId="Login"
        v-model="form.login"
      />

      <InputForm
        label="Senha"
        inputId="Password"
        inputType="password"
        v-model="form.password"
      />

      <section class="login-form__btn-group">
        <Button
          buttonStyle="transparent"
          buttonText="Ainda não tem uma conta?"
          @clickEvent="goToRegisterArea"
        />

        <Button
          buttonText="Entrar"
          buttonType="submit"
          @clickEvent="login"
        />
      </section>
    </form>
  </main>
</template>

<script>
import InputForm from  './components/InputForm.vue'
import Button from './components/Button.vue'

export default {
  name: 'Login',

  components: {
    InputForm,
    Button
  },

  data() {
    return {
      form: {
        login: '',
        password: ''
      }
    }
  },

  methods: {
    goToRegisterArea() {
      this.$router.push({ name: 'register' })
    },

    login() {
      console.log('Logando...')
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
  margin-top: .1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
