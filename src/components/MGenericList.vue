<script lang="ts" setup generic="T">

interface Props{ 
    items: T[],
    emptyMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
    emptyMessage: 'Нет данных для отображения'
})

</script>

<template>
    <div class="w-full">
        <div v-if="props.items.length === 0" class="text-center py-8 text-gray-500">
            {{ props.emptyMessage }}
        </div>
        <div v-else class="space-y-4">
            <template v-for="(item, index) in props.items" :key="index">
                <slot name="item" :item="item" :index="index">
                    <div class="border rounded-lg p-4 bg-white shadow-sm">
                        {{ JSON.stringify(item) }}
                    </div>
                </slot>
            </template>
        </div>
    </div>
</template>