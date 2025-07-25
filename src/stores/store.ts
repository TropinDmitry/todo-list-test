import { defineStore } from "pinia";
import type { Todo } from "../types/types";
import { v4 } from "uuid";
import { DEFAULT_TODOS } from "./defaultData";


export const useStore = defineStore('store', {
    state: () => ({
        todos: [] as Todo[],
        isLoading: false
    }),

    getters: {
        allTodos: (state) => state.todos,
        completedTodos: (state) => state.todos.filter((todo) => todo.isCompleted),
        activeTodos: (state) => state.todos.filter((todo) => !todo.isCompleted)
    },

    actions: {
        async initialData() {
            try {
                this.isLoading = true;

                const todos = localStorage.getItem('todos');
                if (todos) {
                    this.todos = JSON.parse(todos);
                } else {
                    this.todos = [...DEFAULT_TODOS];
                    this.saveData();
                }
            } catch (err) {
                console.error(err);
            } finally {
                this.isLoading = false;
            }
        },

        saveData() {
            try {
                localStorage.setItem('todos', JSON.stringify(this.todos));
            } catch (error) {
                console.error('Ошибка при сохранении данных:', error);
            }
        },

        async addTodo(newItem: Omit<Todo, 'id' | 'createdAt'>) {
            try {
                const newTodo = {
                    id: v4(), 
                    name: newItem.name.trim(),
                    description: newItem.description.trim(),
                    isCompleted: newItem.isCompleted || false,
                    createdAt: new Date().toLocaleDateString(),
                    tags: newItem.tags || [],
                    dueDate: newItem.dueDate || ''
                };

                this.todos.unshift(newTodo);
                this.saveData();

                return newTodo;
            } catch (error) {
                 console.error('Ошибка при добавлении задачи:', error);
            }
        },

        async editTodo(updatedItem: Todo) {
            try {
                const index = this.todos.findIndex((item) => item.id === updatedItem.id);

                if (index === -1) {
                    throw new Error('Задача не найдена');
                }

                const originalTodo = this.todos[index];

                this.todos[index] = {
                    ...updatedItem,
                    name: updatedItem.name.trim(),
                    description: updatedItem.description.trim(),
                    id: originalTodo.id,
                    createdAt: originalTodo.createdAt
                }

                this.saveData();

                return this.todos[index];
            
            } catch (error) {
                console.error('Ошибка при редактировании задачи:', error);
            }
        },

        async toggleCompletedTodo(itemId: string) {
            try {
                const todoIndex = this.todos.findIndex((item) => item.id === itemId);

                if (todoIndex === -1) {
                    throw new Error('Задача не найдена');
                }

                this.todos[todoIndex].isCompleted = !this.todos[todoIndex].isCompleted;
                this.saveData();

                return this.todos[todoIndex];
            } catch (error) {
                console.error('Ошибка при изменении статуса:', error);
            }
        },

        async deleteTodo(deleteItemId: string) {
            try {
                const index = this.todos.findIndex((item) => item.id === deleteItemId);

                if (index === -1) {
                    throw new Error('Задача не найдена');
                }

                const deletedTodo = this.todos[index];
                this.todos.splice(index, 1);
                this.saveData();

                return deletedTodo;
            } catch (error) {
                console.error("Ошибка при удалении задачи", error);
            }
        }
    }
})