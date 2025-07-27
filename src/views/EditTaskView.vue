<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import TodoForm from '../components/todos/TodoForm.vue';
import router from '../router';
import { useStore } from '../stores/store';
import type { Todo } from '../types/types';
import { useRoute } from 'vue-router';
import { useToast } from '../composables/useToast';


const route = useRoute();
const store = useStore();
const isLoading = ref(true);
const currentTodo = ref<Todo | null>(null);
const { success, error } = useToast();
const pageTitle = 'Редактирование задачи';

const handleEditTodo = async (formData: Omit<Todo, 'id' | 'createdAt'>) => {
    if (!currentTodo.value) return;

    try {
        await store.editTodo({
            ...formData,
            id: currentTodo.value.id,
            createdAt: currentTodo.value.createdAt
        });

        success("Задача успешно обновлена");
        router.push('/');
    } catch (err) {
        console.error(err);
        error('Не удалось обновить задачу');
    }
};

const handleCancel = () => {
    router.push('/');
}

onMounted(() => {
    try {
        isLoading.value = true;
        const selectedId = route.params.id as string;
        const todo = store.todos.find((item) => item.id === selectedId);

        if (!todo) {
            throw new Error('Task not found');
        }
        currentTodo.value = { ...todo };
    } catch (err) {
        console.error(err);
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <div class="min-h-screen bg-gray-50 py-8">
        <div class="mb-8">
            <h1 class="text-center text-3xl font-bold text-gray-900">
                {{ pageTitle }}
            </h1>
        </div>

        <div v-if="isLoading" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600">
            </div>
        </div>

        <div v-else-if="currentTodo" class="bg-white rounded-lg shadow-sm">
            <div class="p-6">
                <TodoForm 
                    @submit="handleEditTodo"
                    @cancel="handleCancel" 
                    :initial-data="currentTodo" 
                    submit-btn-text="Сохранить"
                    cancel-btn-text="Отмена"
                    form-title="Редактирование" 
                />
            </div>
        </div>

        <div v-else>
            Todo doesn't exist!
        </div>
    </div>
</template>