import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Books from '../views/Books.vue'
import Customer from '../views/Customer.vue'
import Staff from '../views/Staff.vue'
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/admin', 
        name: 'BooksDefault', 
        component: Books 
      },
      {
        path: 'customer',
        name: 'Customer',
        component: Customer
      },
      {
        path: 'staff',
        name: 'Staff',
        component: Staff
      },
      {
        path: 'books',
        name: 'Books',
        component: Books
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next)=>{
  const isAuthenticated = localStorage.getItem('isAuthenticated')

  //Kiểm tra có phải trang login không
  const isLoginPage = to.path === "/login"
  
  if(!isAuthenticated && !isLoginPage){
    localStorage.setItem('redirectPath', to.path)
    console.log(isAuthenticated);
    next('/login')
  }else{
    console.log(isAuthenticated);
    next()
  }
})
export default router
