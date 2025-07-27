<script
    lang="ts"
    setup
>

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
    <form
        @submit.prevent="$emit('submit', $event)"
        class="bg-white p-6 rounded-lg shadow-sm"
    >
        <label
            v-if="labelText"
            class="block text-sm font-medium text-gray-700 mb-2"
        >
            {{ labelText }}
        </label>

        <slot></slot>
    </form>
</template>