import type { Todo } from "../types/types";

export const DEFAULT_TODOS: Todo[] = [
  {
    id: "1",
    name: "Изучить основы Vue.js",
    description: "Пройти официальную документацию по Vue 3 и Composition API",
    isCompleted: true,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    tags: ["обучение", "frontend"],
    dueDate: ""
  },
  {
    id: "2",
    name: "Создать первый компонент",
    description: "Разработать простой компонент с использованием props и events",
    isCompleted: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), 
    tags: ["практика", "компоненты"],
    dueDate: ""
  },
  {
    id: "3",
    name: "Изучить Pinia",
    description: "Разобраться с управлением состоянием в Vue 3 с помощью Pinia",
    isCompleted: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    tags: ["обучение", "state management"],
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  },
  {
    id: "4",
    name: "Настроить Vue Router",
    description: "Добавить маршрутизацию в приложение с несколькими страницами",
    isCompleted: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    tags: ["router", "настройка"],
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  },
  {
    id: "5",
    name: "Изучить TypeScript",
    description: "Освоить основы TypeScript для использования с Vue 3",
    isCompleted: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    tags: ["typescript", "обучение"],
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  },
  {
    id: "6",
    name: "Настроить ESLint и Prettier",
    description: "Добавить линтинг и форматирование кода в проект",
    isCompleted: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    tags: ["инструменты", "настройка"],
    dueDate: ""
  },
  {
    id: "7",
    name: "Изучить Tailwind CSS",
    description: "Освоить основы Tailwind CSS для стилизации компонентов",
    isCompleted: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    tags: ["css", "обучение"],
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  },
  {
    id: "8",
    name: "Создать форму с валидацией",
    description: "Разработать форму с клиентской валидацией полей",
    isCompleted: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    tags: ["формы", "валидация"],
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  },
  {
    id: "9",
    name: "Добавить анимации",
    description: "Использовать Vue Transition для добавления анимаций в приложение",
    isCompleted: false,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    tags: ["ui", "анимации"],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  },
  {
    id: "10",
    name: "Написать тесты",
    description: "Добавить unit-тесты для компонентов с использованием Vitest",
    isCompleted: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    tags: ["тестирование", "качество"],
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  },
  {
    id: "11",
    name: "Оптимизировать производительность",
    description: "Проверить и улучшить производительность приложения",
    isCompleted: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    tags: ["оптимизация", "производительность"],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  },
  {
    id: "12",
    name: "Подготовить презентацию проекта",
    description: "Создать слайды и демо для презентации проекта команде",
    isCompleted: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    tags: ["презентация", "документация"],
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  },
  {
    id: "13",
    name: "Изучить Composition API",
    description: "Глубокое изучение Composition API и его преимуществ",
    isCompleted: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    tags: ["vue3", "обучение"],
    dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  },
  {
    id: "14",
    name: "Настроить CI/CD",
    description: "Настроить автоматическую сборку и деплой проекта",
    isCompleted: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    tags: ["devops", "автоматизация"],
    dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  },
  {
    id: "15",
    name: "Добавить мультиязычность",
    description: "Интегрировать i18n для поддержки нескольких языков",
    isCompleted: false,
    createdAt: new Date().toISOString().split('T')[0],
    tags: ["i18n", "улучшение"],
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  }
];