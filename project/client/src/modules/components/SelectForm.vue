<template>
  <section class="select-form">
    <label :for="`select${selectId}`" class="select-form__label">
      {{ label }}
    </label>
    <select @change="$emit('change', $event.target.value)" :value="value"
      @input="$emit('input', $event.target.value)"
      :id="`select${selectId}`" class="select-form__select">
      <option v-for="option in options"
        :key="option.id" :value="option.value" >
        {{ option.text }}
      </option>
    </select>
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
  padding: .75em .3em;
  outline: none;
  border: none;
  transition: .2s box-shadow ease-in;
  background-color: var(--dark-white);
  color: #222;
  border-radius: 3px;
}

.select-form__select:focus {
  box-shadow: 0 0 4px 0 var(--dark-white);
}
</style>