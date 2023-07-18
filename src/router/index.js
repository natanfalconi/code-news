import { createRouter, createWebHistory } from 'vue-router'
import Blog from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Article from '../views/news/Article.vue'

const routes = [
    {
        path: '/',
        name: 'Blog',
        component: Blog
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/news/:title',
        name: 'news',
        component: Article
    }

]
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router