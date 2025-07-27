<script
    lang="ts"
    setup
>
import { CheckCircle, XCircle, AlertTriangle, X } from 'lucide-vue-next';
import { useToast } from '../../composables/useToast';
import type { Toast } from '../../types/types';

const { toasts, removeToast, pauseToast, resumeToast } = useToast();

const getIcon = (type: Toast['type']) => {
    const icons = {
        success: CheckCircle,
        error: XCircle,
        warning: AlertTriangle
    }

    return icons[type];
}

const getTypeClasses = (type: Toast['type']) => {
    const classes = {
        success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-200',
        error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-200',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-200',
    };
    return classes[type];
};
</script>

<template>
    <Teleport to="body">
        <div class="fixed top-4 right-4 z-100 space-y-2">
            <TransitionGroup
                name="toast"
                tag="div"
            >
                <div
                    v-for="toast in toasts"
                    :key="toast.id"
                    class="flex items-center gap-3 cursor-pointer rounded-lg shadow-lg p-4 min-w-80"
                    :class="getTypeClasses(toast.type)"
                    @mouseover="pauseToast(toast.id)"
                    @mouseout="resumeToast(toast.id)"
                >

                    <component
                        :is="getIcon(toast.type)"
                        class="w-5 h-5 flex-shrink-0"
                    />

                    <div class="flex-1">
                        <p class="font-medium">{{ toast.message }}</p>
                    </div>

                    <button
                        @click="removeToast(toast.id)"
                        class="flex-shrink-0 text-gray-400 hover:text-gray-600"
                    >
                        <X class="w-4 h-4" />
                    </button>
                </div>
            </TransitionGroup>
        </div>
    </Teleport>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
    transition: all 0.3s ease;
}

.toast-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

.toast-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
</style>