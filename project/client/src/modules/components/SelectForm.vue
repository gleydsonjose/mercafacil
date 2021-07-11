<template>
  <section class="select-form">
    <label :for="`select${selectId}`" class="select-form__label">
      {{ label }}
    </label>

    <select
      @change="handlerChange($event.target.value)"
      @input="handlerInput($event.target.value)"
      :value="value"
      :id="`select${selectId}`"
      class="select-form__select"
      :class="selectAdditionalClass"
    >
      <option value="">Escolha</option>
      <option v-for="option in options"
        :key="option.id" :value="option.value" >
        {{ option.text }}
      </option>
    </select>

    <section class="select-form__error-message" v-show="errorValue">
      <i class="fas fa-exclamation-circle select-form__error-message-icon"></i>
      <p class="select-form__error-message-text">{{ errorMessage }}</p>
    </section>
  </section>
</template>

<script>
export default {
  name: 'SelectForm',

  props: {
    label: {
      type: String,
      default: '',
      required: false
    },

    selectId: {
      type: String,
      required: true
    },

    value: {
      type: [String, Number],
      required: true
    },

    options: {
      type: Array,
      default: () => [],
      required: false
    },

    errorValue: {
      type: Boolean,
      default: false,
      required: false
    },

    errorName: {
      type: String,
      default: '',
      required: false
    },

    errorOptions: {
      type: Object,
      default: () => ({}),
      required: false
    }
  },

  data() {
    return {
      errorMessage: ''
    }
  },

  computed: {
    selectAdditionalClass() {
      return {
        'select-form__select--error': this.errorValue
      }
    }
  },

  methods: {
    handlerChange(value) {
      this.$emit('change', value);
      this.inputValidate(value)
    },

    handlerInput(value) {
      this.$emit('input', value);
      this.inputValidate(value)
    },

    inputValidate(value) {
      if (this.errorOptions?.required && !value) {
        this.$emit('change-error-value', this.errorName, true)
        this.errorMessage = 'Escolha um item'
      } else {
        this.$emit('change-error-value', this.errorName, false)
        this.errorMessage = ''
      }
    }
  }
}
</script>

<style scoped>
.select-form {
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: .9em;
}

.select-form__label {
  color: var(--white);
  margin-bottom: .3em;
  font-size: 11pt;
}

.select-form__select {
  padding: .7em .3em;
  outline: none;
  border: 2px solid var(--dark-white);
  transition: .2s box-shadow ease-in;
  background-color: var(--dark-white);
  color: #222;
  border-radius: 3px;
}

.select-form__select--error {
  border: 2px solid var(--red);
}

.select-form__select:focus {
  box-shadow: 0 0 4px 0 var(--dark-white);
}

.select-form__select--error:focus {
  box-shadow: 0 0 4px 0 var(--red);
}

.select-form__error-message {
  display: flex;
  align-items: center;
  margin: .3em 0 0 0;
  color: var(--red);
}

.select-form__error-message-text {
  font-size: 11pt;
  margin: 0;
}

.select-form__error-message-icon {
  font-size: 10pt;
  margin-right: .3em;
}
</style>