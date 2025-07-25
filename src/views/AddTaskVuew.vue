<script lang="ts" setup>
import TodoForm from '../components/todos/TodoForm.vue';
import router from '../router';
import { useStore } from '../stores/store';
import type { Todo } from '../types/types';


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
    <TodoForm @submit="handleCreateTodo" @cancel="handleCancel" submit-btn-text="Create" cancel-btn-text="Cancel" />
</template>