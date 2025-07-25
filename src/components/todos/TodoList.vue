<script lang="ts" setup>
import type { Todo } from '../../types/types';
import TodoItem from './TodoItem.vue';


defineProps<{
    todos: Todo[]
}>();

const emit = defineEmits<{
    (e: 'toggle', id: string): void,
    (e: 'edit', id: string): void,
    (e: 'delete', id: string): void,
}>();

const toggleComplete = (id: string) => {
    emit('toggle', id);
};

const editTodo = (id: string) => {
    emit('edit', id);
};

const deleteTodo = (id: string) => {
    emit('delete', id);
};
</script>

<template>

    <div class="space-y-3">
        <div v-if="todos.length === 0" class="text-center py-4">
            No todos found
        </div>
        <template v-else>
            <TodoItem v-for="todo in todos" 
                :key="todo.id"
                :todo="todo"
                @toggle="toggleComplete(todo.id)" 
                @edit="editTodo(todo.id)" 
                @delete="deleteTodo(todo.id)" 
            />
        </template>
    </div>
</template>