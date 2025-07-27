<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import MForm from '../ui/form/MForm.vue';
import MInput from '../ui/form/MInput.vue';
import MTextArea from '../ui/form/MTextArea.vue';
import MButton from '../ui/MButton.vue';
import type { Todo } from '../../types/types';
import { X, Plus } from 'lucide-vue-next';
import { useToast } from '../../composables/useToast';


const { success, error, warning } = useToast();

const formData = reactive<Omit<Todo, 'id' | 'createdAt'>>({
    name: '',
    description: '',
    dueDate: '',
    isCompleted: false,
    tags: []
});

const newTag = ref('');

const props = defineProps<{
    initialData?: Partial<Todo>,
    submitBtnText: string,
    cancelBtnText: string,
    formTitle?: string
}>();

const emit = defineEmits<{
    (e: 'submit', formData: Omit<Todo, 'id' | 'createdAt'>): void,
    (e: 'cancel'): void
}>();

const onSubmit = () => {
    emit('submit', {...formData});
};

const addTag = () => {
    const tag = newTag.value.trim();

    if (tag) {
        if(!formData.tags.includes(tag)) {
            formData.tags.push(tag);
            newTag.value = '';
            success('Тег добавлен');
        } else {
            warning('Такой тег уже существует');
        }
    } else {
        warning('Введите название тега');
    }
}

const removeTag = (tagToRemove: string) => {
    formData.tags = formData.tags.filter(tag => tag !== tagToRemove);
    success('Тег удален');
};

const onTagKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTag();
    }
}

watch(() => props.initialData, (newVal) => {
    if (newVal) {
        Object.assign(formData, {
            name: newVal.name,
            description: newVal.description,
            dueDate: newVal.dueDate || '',
            tags: newVal.tags || [],
            isCompleted: newVal.isCompleted || false
        })
    }
}, { immediate: true});
</script>

<template>
    <div class="max-w-2xl mx-auto">

    </div>
    <MForm @submit="onSubmit" :title="formTitle" class="space-y-6">
        <MInput v-model="formData.name" label-text="Название" type="text" :required="true" 
            name="name" placeholder="Введите нразвание задачи..." />
        
        <MTextArea v-model="formData.description" label-text="Описание задачи" :required="true" name="description"
            rows="4" placeholder="Опишите задачу..." />
            
        <MInput
            v-model="formData.dueDate"
            label-text="Срок выполнения"
            type="date"
            name="dueDate"
        />

        <div class="flex gap-2 mb-3">
            <MInput
                v-model="newTag"
                name="newTag"
                type="text"
                placeholder="Добавить тег..."
                @keydown="onTagKeydown"
                class="flex-1"
            />
            <MButton
                type="button"
                @click="addTag"
                :disabled="!newTag.trim()"
                class="flex items-center gap-1"
            >
                <Plus class="w-4 h-4" />
                Добавить
            </MButton>
        </div>

        <div v-if="formData.tags.length > 0" class="flex flex-wrap gap-2">
            <span
                v-for="tag in formData.tags"
                :key="tag"
                class="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm"
            >
                {{ tag }}
                <MButton
                    type="button"
                    @click="removeTag(tag)"
                    class="ml-1 hover-text-red-600 transition-colors"
                >
                    <X class="w-3 h-3" />
                </MButton>

            </span>
        </div>

        <div class="form__buttons flex gap-3 justify-end pt-4 border-t">
            <MButton v-if="submitBtnText" type="submit">{{ submitBtnText }}</MButton>
            <MButton v-if="cancelBtnText" @click="$emit('cancel')" type="button">{{ cancelBtnText }}</MButton>
        </div>
    </MForm>
</template>