import React, { useState, useEffect } from 'react';
import { Task, TaskFilter } from '../types/task';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { TaskService } from '../services/api';

const TaskList: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [showForm, setShowForm] = useState<boolean>(false);
	const [editingTask, setEditingTask] = useState<Task | null>(null);
	const [filter, setFilter] = useState<TaskFilter>({});
	const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

	// Fetch tasks
	const fetchTasks = async () => {
		try {
			setLoading(true);
			const data = await TaskService.getTasks(filter);
			setTasks(data);
			setError(null);
		} catch (err) {
			setError('Failed to fetch tasks. Please try again.');
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	// Initial load
	useEffect(() => {
		fetchTasks();
	}, [filter]);

	// Show notification
	const showNotification = (message: string, type: 'success' | 'error') => {
		setNotification({ message, type });
		setTimeout(() => setNotification(null), 3000);
	};

	// Handle form submission (create/update)
	const handleSubmit = async (task: Task) => {
		try {
			if (editingTask && editingTask.id) {
				// Update existing task
				await TaskService.updateTask(editingTask.id, task);
				showNotification('Task updated successfully!', 'success');
			} else {
				// Create new task
				await TaskService.createTask(task);
				showNotification('Task created successfully!', 'success');
			}

			setShowForm(false);
			setEditingTask(null);
			fetchTasks();
		} catch (err) {
			showNotification('Failed to save task. Please try again.', 'error');
			console.error(err);
		}
	};

	// Handle task deletion
	const handleDelete = async (id: number) => {
		if (window.confirm('Are you sure you want to delete this task?')) {
			try {
				await TaskService.deleteTask(id);
				showNotification('Task deleted successfully!', 'success');
				fetchTasks();
			} catch (err) {
				showNotification('Failed to delete task. Please try again.', 'error');
				console.error(err);
			}
		}
	};

	// Handle edit button click
	const handleEdit = (task: Task) => {
		setEditingTask(task);
		setShowForm(true);
	};

	// Handle status toggle
	const handleToggleStatus = async (id: number, status: 'Incomplete' | 'Completed') => {
		try {
			await TaskService.updateTask(id, { status });
			showNotification(`Task marked as ${status}!`, 'success');
			fetchTasks();
		} catch (err) {
			showNotification('Failed to update task status. Please try again.', 'error');
			console.error(err);
		}
	};

	// Handle filter change
	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFilter(prev => ({
			...prev,
			[name]: value === 'all' ? undefined : value
		}));
	};

	return (
		<div className="task-list-container">
			{/* Notification */}
			{notification && (
				<div className={`notification ${notification.type}`}>
					{notification.message}
				</div>
			)}

			{/* Task filters */}
			<div className="task-filters">
				<div className="filter-control">
					<label htmlFor="status-filter">Filter by Status:</label>
					<select
						id="status-filter"
						name="status"
						value={filter.status || 'all'}
						onChange={handleFilterChange}
					>
						<option value="all">All</option>
						<option value="Incomplete">Incomplete</option>
						<option value="Completed">Completed</option>
					</select>
				</div>

				<button className="add-task-btn" onClick={() => {
					setEditingTask(null);
					setShowForm(true);
				}}>
					Add New Task
				</button>
			</div>

			{/* Task form */}
			{showForm && (
				<div className="task-form-container">
					<h2>{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
					<TaskForm
						task={editingTask || undefined}
						onSubmit={handleSubmit}
						onCancel={() => {
							setShowForm(false);
							setEditingTask(null);
						}}
					/>
				</div>
			)}

			{/* Task list */}
			<div className="tasks">
				<h2>Tasks {loading && '(Loading...)'}</h2>

				{error && <div className="error-message">{error}</div>}

				{!loading && tasks.length === 0 && (
					<div className="empty-state">
						<p>No tasks found. Add your first task!</p>
					</div>
				)}

				{tasks.map(task => (
					<TaskItem
						key={task.id}
						task={task}
						onDelete={handleDelete}
						onEdit={handleEdit}
						onToggleStatus={handleToggleStatus}
					/>
				))}
			</div>
		</div>
	);
};

export default TaskList;