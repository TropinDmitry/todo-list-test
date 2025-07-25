<script lang="ts" setup>
import { Search } from 'lucide-vue-next';
import { ref, watch } from 'vue';


const emit = defineEmits<{
    (e: 'search', query: string): void,
    (e: 'filter', status: string): void,
    (e: 'sort', sortBy: string): void
}>();

const searchQuery = ref('');
const selectedStatus = ref('all');
const sortBy = ref('date');

watch(searchQuery, (newQuery) => {
    emit('search', newQuery);
});

watch(selectedStatus, (newStatus) => {
    emit('filter', newStatus);
});

watch(sortBy, (newSort) => {
    emit('sort', newSort);
})
</script>

<template>
    <div class="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1 relative">
                <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Поиск задач..."
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
            </div>

            <select
                v-model="selectedStatus"
                class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="all">Все задачи</option>
                <option value="active">Активные</option>
                <option value="completed">Выполненные</option>
            </select>

            <select
                v-model="sortBy"
                class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="date">По дате</option>
                <option value="name">По названию</option>
            </select>
        </div>
    </div>
</template>