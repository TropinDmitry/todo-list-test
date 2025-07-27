<script
    lang="ts"
    setup
>
import TodoForm from '../components/todos/TodoForm.vue';
import router from '../router';
import { useStore } from '../stores/store';
import type { Todo } from '../types/types';


const pageTitle = "Создание задачи";

const handleCreateTodo = (formData: Omit<Todo, 'id' | 'createdAt'>) => {
    const store = useStore();

    try {
        store.addTodo(formData);
    } catch (err) {
        console.error(err);
    }

    router.push('/');
}

const handleCancel = () => {
    router.push('/');
}
</script>

<template>
    <div class="min-h-screen bg-gray-50 py-8">
        <div class="mb-8">
            <h1 class="text-center text-3xl font-bold text-gray-900">
                {{ pageTitle }}
            </h1>
        </div>

        <div class="bg-white rounded-lg shadow-sm">
            <div class="p-6">
                <TodoForm
                    @submit="handleCreateTodo"
                    @cancel="handleCancel"
                    submit-btn-text="Create"
                    cancel-btn-text="Cancel"
                />
            </div>
        </div>
    </div>
</template>