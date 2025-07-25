<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import TodoList from '../components/todos/TodoList.vue';
import { useStore } from '../stores/store';
import router from '../router';
import { todoService } from '../services/todoService';
import { Plus } from 'lucide-vue-next';
import MButton from '../components/ui/MButton.vue';
import TodoFilters from '../components/todos/TodoFilters.vue';
import MPagination from '../components/ui/MPagination.vue';
import MGenericList from '../components/MGenericList.vue';
import TodoItem from '../components/todos/TodoItem.vue';


const store = useStore();

const searchQuery = ref('');
const statusFilter = ref('all');
const sortBy = ref('date');
const currentPage = ref(1);
const itemsPerPage = 10;

const filteredTodos = computed(() => {
    let todos = store.allTodos;

    if (searchQuery.value) {
        todos = todoService.searchTodos(todos, searchQuery.value);
    }

    todos = todoService.filterByStatus(todos, statusFilter.value as any);

    todos = todoService.sortTodos(todos, statusFilter.value as any);

    return todos;
})

//const todoItems = computed(() => store.todos);
const paginatedData = computed(() => {
    return todoService.paginateTodos(filteredTodos.value, currentPage.value, itemsPerPage);
});

const handleSearch = (query: string) => {
  searchQuery.value = query;
  currentPage.value = 1; // Сбрасываем на первую страницу
};

const handleFilter = (status: string) => {
  statusFilter.value = status;
  currentPage.value = 1;
};

const handleSort = (sort: string) => {
  sortBy.value = sort;
  currentPage.value = 1;
};

const handleToggleTodo = (itemId: string) => {
    store.toggleCompletedTodo(itemId);
}

const handleEditTodo = (itemId: string) => {
    router.push({name: 'EditTodo', params: { id: itemId }})
}

const handleDeleteTodo = (itemId: string) => {
  if(confirm('Удалить задачу?')){
    store.deleteTodo(itemId);
  }
}

onMounted(() => {
    store.initialData();
})
</script>

<template>
    <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 py-8">
    
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Мои задачи</h1>
          <p class="text-gray-600 mt-1">
            Всего задач: {{ store.todos.length }}, 
            выполнено: {{ store.completedTodos.length }}
          </p>
        </div>
        
        <MButton @click="router.push('/create')" class="flex items-center gap-2">
          <Plus class="w-4 h-4" />
          Новая задача
        </MButton>
      </div>

      <TodoFilters
        @search="handleSearch"
        @filter="handleFilter"
        @sort="handleSort"
      />

      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-6">
          <!-- <TodoList
            :todos="paginatedData.items"
            @toggle="handleToggleTodo"
            @edit="handleEditTodo"
            @delete="handleDeleteTodo"
          /> -->
          <MGenericList :items="paginatedData.items" empty-message="Задачи не найдены">
            <template #item="{item}">
              <TodoItem
                :todo="item"
                @toggle="handleToggleTodo(item.id)"
                @edit="handleEditTodo(item.id)"
                @delete="handleDeleteTodo(item.id)"
              />
            </template>
          </MGenericList>
        </div>
        
        <MPagination
          :current-page="currentPage"
          :total-pages="paginatedData.totalPages"
          :total-items="paginatedData.totalItems"
          @update:page="currentPage = $event"
        />
      </div>
    </div>
  </div>
</template>