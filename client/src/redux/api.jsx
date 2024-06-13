import axios from 'axios';

export const fetchTodoList = async () => {
  try {
    const response = await axios.get(`http://localhost:9988/getToDoList`);
    return response.data.data;
  } catch (error) {
    throw new Error('Error fetching todo list:', error);
  }
};

export const addTodoItem = async (title, description) => {
  try {
    const response = await axios.post(`http://localhost:9988/addToDoList`, { title, description, });
    return response.data;
  } catch (error) {
    throw new Error('Error adding todo item:', error);
  }
};

export const deleteTodoItem = async (id) => {
  try {
    await axios.delete(`http://localhost:9988/delete/${id}`);
    return id;
  } catch (error) {
    throw new Error('Error deleting todo item:', error);
  }
};

export const updateTodoItem = async (id, completed) => {
  try {
    const response = await axios.put(`http://localhost:9988/update/${id}`, { completed });
    return response.data;
  } catch (error) {
    throw new Error('Error updating todo item:', error);
  }
};
