import { createRouter, createWebHistory } from 'vue-router'


import Tampilan from '../components/tampilan.vue'
import GiftBox3D from '../components/GiftBox3D.vue'






const routes = [
  {  path: '/', component:GiftBox3D},
  {  path: '/tampilan', component:Tampilan},





]
const router = createRouter({
  history: createWebHistory(),
  routes,
})



export default router
