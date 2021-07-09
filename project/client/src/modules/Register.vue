<template>
  <main class="register">
    <form class="register-form">
      <InputForm
        label="Login"
        inputId="Login"
        v-model="form.login"
      />

      <SelectForm
        label="Cliente"
        selectId="Cliente"
        v-model="form.id_client"
        :options="clientesSelectOptions"
      />

      <InputForm
        label="Senha"
        inputId="Password"
        inputType="password"
        v-model="form.password"
      />

      <InputForm
        label="Confirmar Senha"
        inputId="ConfirmPassword"
        inputType="password"
        v-model="form.confirmPassword"
      />

      <section class="register-form__btn-group">
        <Button
          buttonText="Cadastrar"
          buttonType="submit"
          @clickEvent="register"
        />
      </section>
    </form>
  </main>
</template>

<script>
import InputForm from  './components/InputForm.vue'
import SelectForm from  './components/SelectForm.vue'
import Button from './components/Button.vue'

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
        id_client: '',
        password: '',
        confirmPassword: ''
      },

      clientes: [
        {
          id: 1,
          description: 'Macapá'
        },
        {
          id: 2,
          description: 'VareJão'
        },
      ]
    }
  },

  computed: {
    clientesSelectOptions() {
      return this.clientes.map((cliente) => ({
        id: cliente.id,
        text: cliente.description,
        value: cliente.id
      }))
    }
  },

  methods: {
    register() {
      console.log('Registrando')
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
  max-width: 300px;
}

.register-form__btn-group {
  margin-top: .1em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
