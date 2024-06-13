import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTodoList, addTodoItem, deleteTodoItem, updateTodoItem } from './api';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  try {
    const todos = await fetchTodoList();
    return todos;
  } catch (error) {
    throw new Error('Error fetching todos:', error);
  }
});

export const addTodo = createAsyncThunk('todos/addTodo', async ({ title, description }, { dispatch }) => {
  try {
    const todo = await addTodoItem(title, description);
    dispatch(fetchTodos());
    return todo;
  } catch (error) {
    throw new Error('Error adding todo:', error);
  }
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  try {
    await deleteTodoItem(id);
    return id;
  } catch (error) {
    throw new Error('Error deleting todo:', error);
  }
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, completed }) => {
  try {
    const updatedTodo = await updateTodoItem(id, completed);
    return updatedTodo;
  } catch (error) {
    throw new Error('Error updating todo:', error);
  }
});

export const updateTodoAndRefresh = ({ id, completed }) => async dispatch => {
  try {
    const updatedTodo = await updateTodoItem(id, completed);
    dispatch(updateTodoAndRefreshSuccess(updatedTodo));
  } catch (error) {
    throw new Error('Error updating todo:', error);
  }
};

const updateTodoAndRefreshSuccess = (updatedTodo) => {
  return {
    type: 'todos/updateTodoFulfilled',
    payload: updatedTodo,
  };
};

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      })
      .addCase('todos/updateTodoFulfilled', (state, action) => {
        state.todos = state.todos.map((todo) => (todo._id === action.payload._id ? action.payload : todo));
      });
  },
});

export default todoSlice.reducer;