import { createRouter, createWebHistory } from 'vue-router'


import Tampilan from '../components/tampilan.vue'
import GiftBox3D from '../components/GiftBox3D.vue'
import dfss from '../components/dfss.vue'





const routes = [
  {  path: '/', component:GiftBox3D},
  {  path: '/tampilan', component:Tampilan},
  {path: '/h', component:dfss}




]
const router = createRouter({
  history: createWebHistory(),
  routes,
})



export default router
