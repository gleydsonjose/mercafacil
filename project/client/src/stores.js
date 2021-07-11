import Request from './helpers/Request'
import jwt_decode from 'jwt-decode'

export default {
  state: {
    clients: [
      {
        id: 1,
        description: 'Macapá',
        contactFormOptions: {
          format: {
            name: {
              upperCase: true
            },
            cellphone: {
              phoneNumber: true,
              cleanPhoneNumber: false
            }
          },

          errors: {
            name: {
              required: true,
              min: 3,
              max: 30,
            },

            cellphone: {
              required: true,
              min: 13,
              max: 19
            }
          }
        }
      },
      {
        id: 2,
        description: 'VareJão',
        contactFormOptions: {
          format: {
            name: {
              upperCase: false
            },
            cellphone: {
              phoneNumber: false,
              cleanPhoneNumber: true
            }
          },

          errors: {
            name: {
              required: true,
              min: 3,
              max: 30,
            },

            cellphone: {
              required: true,
              min: 13,
              max: 13
            }
          }
        }
      },
    ],

    contacts: [],

    current_active_menu_item: '',

    notification_options: {
      status: '',
      show: false,
      message: ''
    },

    user_is_authenticated: false
  },

  getters: {
    getUserDataFromSession(state) {
      if (state.user_is_authenticated) {
        const userData = jwt_decode(sessionStorage.getItem('token'))
        return userData
      }
    },

    currentClient(state, getters) {
      return state.clients.find(({ id }) => id === getters.getUserDataFromSession?.id_client)
    }
  },

  mutations: {
    SET_CONTACTS(state, payload) {
      state.contacts = payload
    },

    UPDATE_CONTACT(state, payload) {
      const contactIndex = state.contacts.findIndex(({id}) => id === payload.id)

      if (contactIndex != -1) {
        state.contacts.splice(contactIndex, 1, payload)
      }
    },

    DELETE_CONTACT(state, payload) {
      const contactIndex = state.contacts.findIndex(({ id }) => id === payload.id)

      if (contactIndex != -1) {
        state.contacts.splice(contactIndex, 1)
      }
    },

    SET_CURRENT_ACTIVE_MENU_ITEM(state, payload) {
      state.current_active_menu_item = payload
    },

    OPEN_NOTIFICATION(state, payload) {
      state.notification_options = payload
    },

    CLOSE_NOTIFICATION(state, payload) {
      state.notification_options = payload
    },

    SET_USER_IS_AUTHENTICATED(state, payload) {
      state.user_is_authenticated = payload
    }
  },

  actions: {
    async getAllContacts(context) {
      const responseData = await Request(
        'http://localhost:5000/api/contact',
        'GET',
        null,
        true
      )

      if (responseData.status === 'success') {
        context.commit('SET_CONTACTS', responseData.data.contacts)
      }


      if (responseData?.message) {
        context.commit('OPEN_NOTIFICATION', {
          status: responseData.status,
          show: true,
          message: responseData.message
        })
      }
    }
  }
}