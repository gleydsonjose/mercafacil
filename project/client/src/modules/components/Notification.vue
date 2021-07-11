<template>
  <div
    v-show="notification_options.show"
    class="notification"
    :class="notificationBodyAdditionalClass"
  >
    <div class="notification__main">
      <i class="fas notification__icon" :class="iconAdditionalClass"></i>
      <p class="notification__message">{{ notification_options.message }}</p>
    </div>

    <div class="notification__btn-close" @click="CLOSE_NOTIFICATION({ show: false })">
      <i class="fas fa-times notification__btn-close-icon"></i>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Notification',

  computed: {
    ...mapState(['notification_options']),

    iconAdditionalClass() {
      return {
        'fa-check-circle': this.notification_options.status === 'success',
        'fa-exclamation-circle' : this.notification_options.status === 'error'
      }
    },

    notificationBodyAdditionalClass() {
      return {
        'notification--success': this.notification_options.status === 'success',
        'notification--error' : this.notification_options.status === 'error'
      }
    }
  },

  watch: {
    'notification_options.show': function (currentValue) {
      if (currentValue) {
        this.closeNotificationAfterSomeSeconds()
      }
    }
  },

  methods: {
    ...mapMutations(['CLOSE_NOTIFICATION']),

    closeNotificationAfterSomeSeconds() {
      setTimeout((self) => {
        self.CLOSE_NOTIFICATION({
          status: '',
          show: false,
          message: ''
        })
      }, 3000, this)
    }
  }
}
</script>

<style scoped>
@keyframes showNotification {
  from { opacity: 0; }
  to { opacity: 1; }
}

.notification {
  position: fixed;
  width: 320px;
  top: .5em;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  color: var(--white);
  justify-content: space-between;
  align-items: center;
  padding-left: 1em;
  border-radius: 3px;
  animation: .5s showNotification normal;
  box-shadow: 0 0 2px var(--black);
  z-index: 10;
}

.notification--success {
  background-color: var(--green);
}

.notification--error {
  background-color: var(--dark-red);
}

.notification__main {
  display: flex;
  align-items: center;
}

.notification__icon {
  font-size: 10pt;
  margin-right: .4em;
}

.notification__message {
  word-break: break-all;
  font-size: 11pt;
  margin: 0;
}

.notification__btn-close {
  padding: 1em .7em;
  margin-left: 1em;
  background-color: var(--white);
  color: var(--black);
  border-radius: 0 3px 3px 0;
  cursor: pointer;
  transition: .2s background-color ease-in;
}

.notification__btn-close:hover {
  background-color: var(--dark-white);
}

.notification__btn-close-icon {
  font-size: 10pt;
}
</style>