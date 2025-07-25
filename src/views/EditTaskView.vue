<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import TodoForm from '../components/todos/TodoForm.vue';
import router from '../router';
import { useStore } from '../stores/store';
import type { Todo } from '../types/types';
import { useRoute } from 'vue-router';


const route = useRoute();
const store = useStore();
const isLoading = ref(true);
const currentTodo = ref<Todo | null>(null);

const pageTitle = computed(() => {
    currentTodo.value ? `Редактирование ${currentTodo.value.name}` : 'Редактирование задачи'
});

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
})

const handleEditTodo = async (formData: Omit<Todo, 'id' | 'createdAt'>) => {
    if (!currentTodo.value) return;

    try {
        await store.editTodo({
            ...formData,
            id: currentTodo.value.id,
            createdAt: currentTodo.value.createdAt
        });

        router.push('/');
    } catch (err) {
        console.error(err);
    }
};

const handleCancel = () => {
    router.push('/');
}
</script>

<template>
    <div class="min-h-screen bg-gray-50 py-8">
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900">
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