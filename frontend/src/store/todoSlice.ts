import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodoFilter } from '../types';

interface TodoState {
  todos: Todo[];
  filter: TodoFilter;
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  filter: {
    status: 'all',
  },
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    setFilter: (state, action: PayloadAction<TodoFilter>) => {
      state.filter = action.payload;
    },
    loadTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
  },
});

export const {
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  setFilter,
  loadTodos,
} = todoSlice.actions;

export default todoSlice.reducer;
