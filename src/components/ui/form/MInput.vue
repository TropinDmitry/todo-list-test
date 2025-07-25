<script lang="ts" setup>
import type { InputHTMLAttributes } from 'vue';


interface Props {
    labelText?: string,
    name: string,
    type: InputHTMLAttributes["type"],
    required?: boolean,
    placeholder?: string
}

withDefaults(defineProps<Props>(), {
    required: false,
    type: 'text'
})

const modelValue = defineModel<string | number>();

defineEmits<{
    (e: 'keydown', event: KeyboardEvent): void,
    (e: 'focus', event: FocusEvent): void
}>();
</script>

<template>
    <div class="form__input w-full">
        <div class="flex justify-between mb-1">

        </div>
        <label v-if="labelText" class="block text-sm font-medium text-gray-700">
            {{ labelText }}
            <span v-if="required" class="text-red-500 ml-1">*</span>
        </label>
        <input :name="name" :type="type" v-model="modelValue" :required="required" :placeholder="placeholder" @keydown="(e) => $emit('keydown', e)" class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline none focus:ring-2 transition-colors" />
    </div>
</template>