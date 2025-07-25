<script lang="ts" setup>
defineProps<{
    labelText?: string,
    required?: boolean,
    name: string,
    placeholder?: string
}>();

const modelValue = defineModel({type: String});
</script>

<template>
    <div class="form__textarea w-full">
        <label v-if="labelText" class="">{{ labelText }}</label>
        <textarea v-model="modelValue" :required="required" :name="name" :placeholder="placeholder" class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline none focus:ring-2 transition-colors"></textarea>
    </div>
</template>