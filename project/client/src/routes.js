import Login from './modules/Login.vue'
import UserArea from './modules/UserArea.vue'
import Register from './modules/Register.vue'
import Contacts from './modules/Contacts.vue'
import AddContact from './modules/AddContact.vue'

const routes = [
  {
    path: '/',
    beforeEnter: (to, from, next) => {
      next('/login')
    }
  },
  {
    path: '/user-area',
    name: 'user-area',
    component: UserArea,
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
        path: 'add-contact',
        name: 'add-contact',
        components: {
          userAreaView: AddContact
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

export default routes