<script setup lang="ts">
import { onMounted } from 'vue';
import MHeader from './components/MHeader.vue';
import MLoading from './components/ui/MLoading.vue';
import MToasts from './components/ui/MToasts.vue';
import { useStore } from './stores/store';


const store = useStore();

onMounted(() => {
  store.initialData();
});
</script>

<template>
  <MHeader />
  <router-view></router-view>

  <MToasts />
  <MLoading />
</template>

<style scoped>

</style>
