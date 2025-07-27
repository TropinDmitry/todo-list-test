import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import HomeView from "./views/HomeView.vue";


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
        meta: { title: 'Список задач'}
    },
    {
        path: '/create',
        name: 'CreateTodo',
        component: () => import('./views/AddTaskVuew.vue'),
        meta: { title: 'Создать задачу'}
    },
    {
        path: '/edit/:id',
        name: 'EditTodo',
        component: () => import('./views/EditTaskView.vue'),
        meta: { title: 'Редактировать задачу'},
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

router.beforeEach((to) => {
    document.title = `${to.meta.title} | Todo List`
});

export default router;