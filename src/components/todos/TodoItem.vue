<script lang="ts" setup>
import { computed } from 'vue';
import MButton from '../ui/MButton.vue';
import MCheckbox from '../ui/form/MCheckbox.vue';
import type { Todo } from '../../types/types';
import { Edit, Tag, Trash2 } from 'lucide-vue-next';
import { todoService } from '../../services/todoService';

const props = defineProps<{
    todo: Todo
}>();

defineEmits<{
    (e: 'toggle'): void,
    (e: 'edit'): void,
    (e: 'delete'): void,
}>();


</script>

<template>
    <div class="border rounded-lg p-4 shadow-sm bg-white hover-shadow-md transition-shadow duration-200">
        <div class="flex items-start gap-3 mb-3">
            <MCheckbox 
                :model-value="todo.isCompleted" 
                name="completeTodo" 
                :id="todo.id"
                @change="$emit('toggle')" 
                :label-text="todo.isCompleted ? 'Выполнено' : 'Не выполнено'"
                class="mt-1 flex-shrink-0" 
            />
            <div class="flex-1 min-w-0">
                <h3 class="text-lg font-semibold mb-2 break-words">{{ todo.name }}</h3>
                <p v-if="todo.description" class="text-gray-600 text-sm leading-relaxed break-words">{{ todo.description }}</p>
            </div>
        </div>

        <div v-if="todo.tags && todo.tags.length > 0" class="mb-3">
            <div class="flex flex-wrap gap-2">
                <span v-for="tag in todo.tags"
                    :key="tag"
                    class="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2.5 py-0.5"
                >
                    <Tag class="w-3 h-3" />
                    {{ tag }}
                </span>
            </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 text-sm text-gray-500">
            <div class="flex items-center gap-4">
                <span>
                    Created at: {{ todoService.dateFormatted(todo.createdAt) }}
                </span>
                <span v-if="todoService.dateFormatted(todo.dueDate)" class="text-sm text-gray-500">
                    Due: {{ todoService.dateFormatted(todo.dueDate) }}
                </span>
            </div>
        </div>
        
        <div class="flex gap-2 justify-end mt-1">
            <MButton @click="$emit('edit')">
                <Edit class="w-4 h-4" />
                Изменить
            </MButton>
            <MButton @click="$emit('delete')">
                <Trash2 class="w-4 h-4" />
                Удалить
            </MButton>
        </div>
    </div>
</template>