<template>
  <section class="input-form">
    <label
      :for="`input${inputId}`"
      class="input-form__label"
      :class="inputLabelAdditionalClass"
    >
      {{ label }}
    </label>

    <input
      :type="inputType"
      class="input-form__input"
      :class="inputAdditionalClass"
      :id="`input${inputId}`"
      :value="value"
      :maxlength="inputMaxLength"
      @input="handlerInput($event.target.value)"
      autocomplete="off"
    >

    <section class="input-form__error-message" v-show="errorValue">
      <i class="fas fa-exclamation-circle input-form__error-message-icon"></i>
      <p class="input-form__error-message-text">{{ errorMessage }}</p>
    </section>
  </section>
</template>

<script>
export default {
  name: 'InputForm',

  props: {
    label: {
      type: String,
      default: '',
      required: false
    },

    inputMode: {
      type: String,
      default: '',
      required: false
    },

    inputId: {
      type: String,
      required: true
    },

    inputType: {
      type: String,
      default: 'text',
      required: false
    },

    inputMaxLength: {
      type: [String, Number],
      default: '',
      required: false
    },

    value: {
      type: [String, Number],
      required: true
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
    },

    valueFormatOptions: {
      type: Object,
      default: () => ({}),
      required: false
    },
  },

  data() {
    return {
      errorMessage: ''
    }
  },

  computed: {
    inputLabelAdditionalClass() {
      return this.inputMode === 'inverted' ? 'input-form__label--inverted' : ''
    },

    inputAdditionalClass() {
      return {
        'input-form__input--inverted': this.inputMode === 'inverted' && !this.errorValue,
        'input-form__input--error': this.errorValue
      }
    }
  },

  watch: {
    'errorOptions': {
      deep: true,
      handler: function(currentErrorOptions, oldErrorOptions) {
        if (currentErrorOptions?.equal !== oldErrorOptions?.equal) {
          if (this.value !== currentErrorOptions.equal) {
            this.$emit('change-error-value', this.errorName, true)
            this.errorMessage = `As senhas não correspondem`
          } else {
            this.$emit('change-error-value', this.errorName, false)
            this.errorMessage = ''
          }
        }
      }
    }
  },

  methods: {
    handlerInput(value) {
      let currentValue = value

      if (this.valueFormatOptions?.upperCase) {
        currentValue = currentValue.toUpperCase()
      } else if (this.valueFormatOptions?.phoneNumber) {
        currentValue = currentValue
          .replace(/[^0-9]/g, '')
          .replace(/^(\d{2})+(\d{2})+(\d{5})+(\d{4})/, '+$1 ($2) $3-$4')
      } else if (this.valueFormatOptions?.cleanPhoneNumber) {
        currentValue = currentValue.replace(/[^0-9]/g, '')
      }

      this.$emit('input', currentValue);
      this.inputValidate(currentValue)
      this.$forceUpdate()
    },

    inputValidate(value) {
      if (this.errorOptions?.required && !value) {
        this.$emit('change-error-value', this.errorName, true)
        this.errorMessage = 'Preencha o campo'
      } else if (this.errorOptions?.min && value.length < this.errorOptions.min) {
        this.$emit('change-error-value', this.errorName, true)
        this.errorMessage = `A quantidade mínima de caracteres é ${this.errorOptions.min}`
      } else if (this.errorOptions?.max && value.length > this.errorOptions.max) {
        this.$emit('change-error-value', this.errorName, true)
        this.errorMessage = `A quantidade máxima de caracteres é ${this.errorOptions.max}`
      } else if (this.errorOptions?.equal && value !== this.errorOptions.equal) {
        this.$emit('change-error-value', this.errorName, true)
        this.errorMessage = `As senhas não correspondem`
      } else {
        this.$emit('change-error-value', this.errorName, false)
        this.errorMessage = ''
      }
    }
  }
}
</script>

<style scoped>
.input-form {
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: .9em;
}

.input-form__label {
  color: var(--white);
  margin-bottom: .3em;
  font-size: 11pt;
}

.input-form__label--inverted {
  color: var(--black);
}

.input-form__input {
  padding: .7em .7em;
  outline: none;
  border: 2px solid var(--dark-white);
  transition: .2s box-shadow ease-in;
  background-color: var(--dark-white);
  color: var(--black);
  border-radius: 3px;
}

.input-form__input--error {
  border: 2px solid var(--red);
}

.input-form__input:focus {
  box-shadow: 0 0 4px 0 var(--dark-white);
}

.input-form__input--error:focus {
  box-shadow: 0 0 4px 0 var(--red);
}

.input-form__input--inverted:focus {
  box-shadow: 0 0 4px 0 var(--black);
}

.input-form__error-message {
  display: flex;
  align-items: center;
  margin: .3em 0 0 0;
  color: var(--red);
}

.input-form__error-message-text {
  font-size: 11pt;
  margin: 0;
}

.input-form__error-message-icon {
  font-size: 10pt;
  margin-right: .3em;
}
</style>