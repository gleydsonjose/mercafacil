<template>
  <button
    v-if="buttonStyle === 'outline'" :type="buttonType"
    class="button button--outline"
    :class="buttonAdditionalClass"
    @click="$emit('clickEvent')"
    :disabled="disabled"
  >
    <i class="button__icon" :class="buttonIcon"></i>
    {{ buttonText }}
  </button>

  <button
    v-else
    :type="buttonType"
    class="button"
    :class="buttonAdditionalClass"
    @click.prevent="$emit('clickEvent')"
    :disabled="disabled"
  >
    <i class="button__icon" :class="buttonIcon"></i>
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  name: 'Button',

  props: {
    buttonType: {
      type: String,
      default: 'button',
      required: false
    },

    buttonStyle: {
      type: String,
      default: '',
      required: false
    },

    buttonText: {
      type: String,
      default: '',
      required: false
    },

    buttonIcon: {
      type: String,
      default: '',
      required: false
    },

    disabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },

  computed: {
    buttonAdditionalClass() {
      return {
        'button--outline-disabled': this.disabled && this.buttonStyle === 'outline',
        'button--disabled': this.disabled
      }
    }
  }
}
</script>

<style scoped>
.button {
  cursor: pointer;
  padding: .8em 1.3em;
  border: 1px solid var(--dark-white);
  border-radius: 3px;
  background-color: var(--dark-white);
  color: var(--black);
  font-size: 10pt;
  transition: .15s background-color ease-in, .15s border ease-in, .15s color ease-in;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button__icon {
  margin-right: .5em;
}

.button:hover {
  background-color: var(--black);
  border: 1px solid var(--black);
  color: var(--dark-white);
}

.button--outline {
  background: transparent;
  color: var(--dark-white);
}

.button--disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.button--disabled:hover {
  background-color: var(--dark-white);
  border: 1px solid var(--dark-white);
  color: var(--black);
}

.button--outline-disabled:hover {
  background: transparent;
  color: var(--dark-white);
}
</style>