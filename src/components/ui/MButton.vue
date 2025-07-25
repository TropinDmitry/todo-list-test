<script lang="ts" setup>
import type { ButtonHTMLAttributes } from 'vue';


defineProps<{
    type?: ButtonHTMLAttributes["type"],
    text?: string,
    disabled?: boolean,
}>();

defineEmits<{
    (e: 'click'): void
}>();
</script>

<template>
    <button @click="$emit('click')" :type="type" :disabled="disabled" class="inline-flex items-center gap-1 cursor-pointer">
        <slot></slot>
    </button>
</template>