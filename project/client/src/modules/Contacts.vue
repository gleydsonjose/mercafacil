<template>
  <section class="contacts">
    <header class="contacts__header">
      <h1 class="contacts__title">Contatos</h1>
    </header>

    <table class="contacts__table">
      <thead class="contacts__thead">
        <tr class="contacts__tr-head">
          <th class="contacts__th">Nome</th>
          <th class="contacts__th">Celular</th>
        </tr>
      </thead>

      <tbody class="contacts__tbody">
        <tr class="contacts__tr-body">
          <td class="contacts__td">
            Nome 1
          </td>
          <td class="contacts__td">
            Nome 2
          </td>
        </tr>

        <tr class="contacts__tr-body">
          <td class="contacts__td">
            0000-0000
          </td>
          <td class="contacts__td">
            1111-1111
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  name: 'Contacts'
}
</script>

<style scoped>
.contacts {
  display: flex;
  flex-flow: column nowrap;
  margin: 1.5em 0 0 1em;
  width: 600px;
}

.contacts__title {
  margin: 0 0 .7em 0;
  font-size: 18pt;
}

.contacts__table, .contacts__td {
  border: 1px solid var(--dark-white);
  border-collapse: collapse;
}

.contacts__th, .contacts__td {
  padding: .6em;
  text-align: left;
}

.contacts__th {
  border: 1px solid var(--black);
  background-color: var(--black);
  color: var(--white);
  border-collapse: collapse;
}
</style>