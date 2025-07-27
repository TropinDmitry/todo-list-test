<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useStore } from '../../stores/store';
import { Loader2 } from 'lucide-vue-next';

const store = useStore();
const isLoading = computed(() => store.isLoading);
const showLoader = ref(false);

watch(isLoading, (newVal) => {
    if(newVal) {
        showLoader.value = true;
    } else {
        setTimeout(() => {
            showLoader.value = false;
        }, 300);
    }
})
</script>

<template>
  <Transition name="fade">
    <div
      v-if="showLoader"
      class="fixed bottom-1 left-1 z-9999"
      aria-live="polite"
      aria-busy="true"
    >
      <div class="flex items-center gap-3 p-2 px-3 rounded-lg bg-white dark:bg-gray-800 shadow-xl text-gray-900 dark:text-gray-100">
        <Loader2 class="w-6 h-6 animate-spin text-blue-600 dark:text-blue-400" />
        <span class="text-lg font-medium">Загрузка...</span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>