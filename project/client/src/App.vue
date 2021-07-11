d<template>
  <div>
    <Notification />
    
    <router-view></router-view>
  </div>
</template>

<script>
import Notification from './modules/components/Notification.vue'

export default {
  name: 'App',

  components: {
    Notification
  }
}
</script>

<style>
body {
  --dark-blue: #032040;
  --light-dark-blue: #09344a;
  --light-blue: #1c475d;
  --dark-white: #ddd;
  --black: #222;
  --white: #fff;
  --light-green: #defe82;
  --green: #2d922d;
  --dark-green: #286928;
  --dark-red: #922d2d;
  --red: #e53535;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}
</style>