<script lang="ts" setup>
import { computed } from 'vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

const props = defineProps<{
  currentPage: number;
  totalPages: number;
  totalItems: number;
}>();

const emit = defineEmits<{
  (e: 'update:page', page: number): void;
}>();

const canGoPrev = computed(() => props.currentPage > 1);
const canGoNext = computed(() => props.currentPage < props.totalPages);

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:page', page);
  }
};

const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, props.currentPage - 2);
  const end = Math.min(props.totalPages, props.currentPage + 2);
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  return pages;
});
</script>

<template>
  <div v-if="totalPages > 1" class="flex items-center justify-between p-4 bg-white border-t">
    <div class="text-sm text-gray-700">
      Показано {{ Math.min(totalItems, (currentPage - 1) * 10 + 1) }} - 
      {{ Math.min(totalItems, currentPage * 10) }} из {{ totalItems }}
    </div>
    
    <div class="flex items-center gap-2">
      
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="!canGoPrev"
        class="flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft class="w-4 h-4" />
        Назад
      </button>
      
      <div class="flex gap-1">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'px-3 py-2 text-sm border rounded-md',
            page === currentPage
              ? 'bg-blue-600 text-white border-blue-600'
              : 'border-gray-300 hover:bg-gray-50'
          ]"
        >
          {{ page }}
        </button>
      </div>
      
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="!canGoNext"
        class="flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Далее
        <ChevronRight class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>