import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Article from '../views/news/Article.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/news/:id',
        name: 'news',
        component: Article
    }

]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router