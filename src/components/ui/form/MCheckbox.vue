<script lang="ts" setup>
import { Check } from 'lucide-vue-next';

defineProps<{
    labelText?: string,
    required?: boolean,
    name: string,
    id: string
}>();

const modelValue = defineModel<boolean>();

const emit = defineEmits<{
    (e: 'change', value: boolean): void
}>();

const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;

    modelValue.value = target.checked;
    emit('change', target.checked);
}

</script>

<template>
    <div class="form__checkbox flex items-center gap-2 relative">
        <label v-if="labelText" :for="`cb-${id}`" :class="[ 'flex items-center justify-center border-2 rounded cursor-pointer transition-all diration-200', modelValue ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300 hover:border-gray-400']">
            <Check v-if="modelValue" class="w-4 h-4" />
            {{ labelText }}
        </label>
        <input type="checkbox" :id="`cb-${id}`" :name="name" :required="required" :checked="modelValue" @change="handleChange" class="sr-only" />
    </div>
</template>