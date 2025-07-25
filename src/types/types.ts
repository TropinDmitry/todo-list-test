export interface Todo {
    id: string,
    name: string,
    description: string,
    isCompleted: boolean,
    dueDate: string,
    tags: string[],
    createdAt: string
}

export interface TodoFilters {
    searchQuery?: string,
    status?: 'active' | 'completed' | 'overdue',
    selectedTags?: string[],
    dueDateRange?: {
        start: Date,
        end: Date
    }
}

export interface SortOption {
    field: 'name' | 'createdAt' | 'dueDate' | 'status',
    direction: 'asc' | 'desc'
}

export interface PaginationInfo {
    items: Todo[],
    totalItems: number,
    totalPages: number,
    currentPage: number,
    hasNextPage: boolean,
    hasPrevPage: boolean
}

