<template>
  <button
    v-if="buttonStyle === 'transparent'" :type="buttonType"
    class="button button--link"
    @click="$emit('clickEvent')"
  >
    {{ buttonText }}
  </button>

  <button
    v-else :type="buttonType" class="button"
    @click.prevent="$emit('clickEvent')"
  >
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
    }
  }
}
</script>

<style scoped>
.button {
  cursor: pointer;
  padding: .8em 1.3em;
  border: none;
  border-radius: 3px;
  background-color: var(--dark-white);
  color: var(--black);
  font-size: 10pt;
  transition: .15s background-color ease-in, .15s color ease-in;
}

.button:hover {
  background-color: var(--black);
  color: var(--dark-white);
}

.button--link {
  background: transparent;
  color: var(--dark-white);
  padding: .4em 0;
}

.button--link:hover {
  text-decoration: underline;
  background: transparent;
  color: var(--dark-white);
}
</style>