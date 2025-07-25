<script lang="ts" setup>

defineProps({
    labelText: {
        type: String,
    },
});

defineEmits<{
    (e: 'submit', formData: Event): void
}>();
</script>

<template>
    <form @submit.prevent="$emit('submit', $event)" class="">
        <label v-if="labelText" class="">{{ labelText }}</label>

        <slot></slot>
    </form>
</template>