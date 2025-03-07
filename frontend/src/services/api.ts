import axios from 'axios';
import { Task, TaskFilter } from '../types/task';

const API_URL = 'http://localhost:5000/api';

export const TaskService = {
	// Get all tasks
	getTasks: async (filter?: TaskFilter) => {
		try {
			let url = `${API_URL}/tasks`;

			if (filter) {
				const params = new URLSearchParams();
				if (filter.status) params.append('status', filter.status);
				if (filter.due_date) params.append('due_date', filter.due_date);

				if (params.toString()) {
					url += `?${params.toString()}`;
				}
			}

			const response = await axios.get(url);
			return response.data;
		} catch (error) {
			console.error('Error fetching tasks:', error);
			throw error;
		}
	},

	// Get task by ID
	getTaskById: async (id: number) => {
		try {
			const response = await axios.get(`${API_URL}/tasks/${id}`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching task with ID ${id}:`, error);
			throw error;
		}
	},

	// Create a new task
	createTask: async (task: Task) => {
		try {
			const response = await axios.post(`${API_URL}/tasks`, task);
			return response.data;
		} catch (error) {
			console.error('Error creating task:', error);
			throw error;
		}
	},

	// Update a task
	updateTask: async (id: number, task: Partial<Task>) => {
		try {
			const response = await axios.put(`${API_URL}/tasks/${id}`, task);
			return response.data;
		} catch (error) {
			console.error(`Error updating task with ID ${id}:`, error);
			throw error;
		}
	},

	// Delete a task
	deleteTask: async (id: number) => {
		try {
			const response = await axios.delete(`${API_URL}/tasks/${id}`);
			return response.data;
		} catch (error) {
			console.error(`Error deleting task with ID ${id}:`, error);
			throw error;
		}
	}
};