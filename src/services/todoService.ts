import type { Todo } from "../types/types";


export class TodoService {
    searchTodos(todos: Todo[], query: string): Todo[] {
        if(!query.trim()) return todos;

        const searchTerm = query.toLowerCase();

        return todos.filter((todo) =>
            todo.name.toLowerCase().includes(searchTerm) ||
            todo.description.toLowerCase().includes(searchTerm)
        );
    }

    filterByStatus(todos: Todo[], status: 'all' | 'active' | 'completed'): Todo[] {
        switch (status) {
            case 'active':
                return todos.filter(todo => !todo.isCompleted);
            case 'completed':
                return todos.filter(todo => todo.isCompleted);
            default:
                return todos;
        }
    }

    sortTodos(todos: Todo[], sortBy: 'name' | 'date'): Todo[] {
        return [...todos].sort((a, b) => {
            if (sortBy === 'name') {
                return a.name.localeCompare(b.name);
            } else {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        })
    }

    paginateTodos(todos: Todo[], page: number, perPage: number) {
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;

        return {
            items: todos.slice(startIndex, endIndex),
            totalPages: Math.ceil(todos.length / perPage),
            currentPage: page,
            totalItems: todos.length
        }
    }

    dateFormatted(date: string) {
        if (!date) return '';

        return new Date(date).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
}

export const todoService = new TodoService();