<script lang="ts" setup>
import { CheckSquare } from 'lucide-vue-next';

</script>

<template>
    <header class="shadow-sm bg-[#1ec1d7]">
        <div class="mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <router-link to="/" class="flex items-center gap-3">
                <CheckSquare class="w-8 h-8 text-blue-600" />
                <h1 class="text-2xl font-bold text-gray-900">Todo List</h1>
            </router-link>
        </div>

    </header>
</template>