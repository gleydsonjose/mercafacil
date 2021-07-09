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
      @input="$emit('input', $event.target.value)"
    >
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

    value: {
      type: [String, Number],
      required: true
    }
  },

  computed: {
    inputLabelAdditionalClass() {
      return this.inputMode === 'inverted' ? 'input-form__label--inverted' : ''
    },

    inputAdditionalClass() {
      return this.inputMode === 'inverted' ? 'input-form__input--inverted' : ''
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
  padding: .8em .7em;
  outline: none;
  border: none;
  transition: .2s box-shadow ease-in;
  background-color: var(--dark-white);
  color: var(--black);
  border-radius: 3px;
}

.input-form__input:focus {
  box-shadow: 0 0 4px 0 var(--dark-white);
}

.input-form__input--inverted:focus {
  box-shadow: 0 0 4px 0 var(--black);
}
</style>