import Login from './modules/Login.vue'
import UserArea from './modules/UserArea.vue'
import Register from './modules/Register.vue'
import Contacts from './modules/Contacts.vue'
import AddContact from './modules/AddContact.vue'
import EditContact from './modules/EditContact.vue'

const routes = [
  {
    path: '*',
    beforeEnter: (to, from, next) => {
      const token = sessionStorage.getItem('token')

      if (token) {
        next({ name: 'contacts' })
      } else {
        next({ name: 'login' })
      }
    }
  },
  {
    path: '/user-area',
    name: 'user-area',
    component: UserArea,
    beforeEnter: (to, from, next) => {
      const token = sessionStorage.getItem('token')

      if (token) {
        next()
      } else {
        next({ name: 'login' })
      }
    },
    children: [
      {
        path: '/',
        redirect: 'contacts'
      },
      {
        path: 'contacts',
        name: 'contacts',
        components: {
          userAreaView: Contacts
        }
      },
      {
        path: 'contact/add',
        name: 'add-contact',
        components: {
          userAreaView: AddContact
        }
      },
      {
        path: 'contact/edit/:id',
        name: 'edit-contact',
        components: {
          userAreaView: EditContact
        },
        beforeEnter: (to, from, next) => {
          if (!isNaN(Number(to.params.id))) {
            next()
          } else {
            next({ name: 'contacts' })
          }
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      const token = sessionStorage.getItem('token')

      if (token) {
        next({ name: 'contacts' })
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: (to, from, next) => {
      const token = sessionStorage.getItem('token')

      if (token) {
        next({ name: 'contacts' })
      } else {
        next()
      }
    }
  }
]

export default routes