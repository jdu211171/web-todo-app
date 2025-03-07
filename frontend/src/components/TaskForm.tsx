import React, { useState, useEffect } from 'react';
import { Task } from '../types/task';

interface TaskFormProps {
	task?: Task;
	onSubmit: (task: Task) => void;
	onCancel: () => void;
}

const initialTask: Task = {
	name: '',
	description: '',
	due_date: '',
	status: 'Incomplete'
};

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
	const [formData, setFormData] = useState<Task>(task || initialTask);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	useEffect(() => {
		if (task) {
			setFormData(task);
		}
	}, [task]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));

		// Clear error when field is edited
		if (errors[name]) {
			setErrors(prev => ({ ...prev, [name]: '' }));
		}
	};

	const validate = () => {
		const newErrors: { [key: string]: string } = {};

		if (!formData.name.trim()) {
			newErrors.name = 'Task name is required';
		}

		// Validate due date is not in the past
		if (formData.due_date) {
			const dueDate = new Date(formData.due_date);
			const today = new Date();
			today.setHours(0, 0, 0, 0);

			if (dueDate < today) {
				newErrors.due_date = 'Due date cannot be in the past';
			}
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (validate()) {
			onSubmit(formData);
		}
	};

	return (
		<form className="task-form" onSubmit={handleSubmit}>
			<div className="form-group">
				<label htmlFor="name">Task Name*</label>
				<input
					type="text"
					id="name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					placeholder="Enter task name"
					className={errors.name ? 'error' : ''}
				/>
				{errors.name && <div className="error-message">{errors.name}</div>}
			</div>

			<div className="form-group">
				<label htmlFor="description">Description</label>
				<textarea
					id="description"
					name="description"
					value={formData.description || ''}
					onChange={handleChange}
					placeholder="Enter task description (optional)"
					rows={3}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="due_date">Due Date</label>
				<input
					type="date"
					id="due_date"
					name="due_date"
					value={formData.due_date || ''}
					onChange={handleChange}
					className={errors.due_date ? 'error' : ''}
				/>
				{errors.due_date && <div className="error-message">{errors.due_date}</div>}
			</div>

			<div className="form-group">
				<label htmlFor="status">Status</label>
				<select
					id="status"
					name="status"
					value={formData.status}
					onChange={handleChange}
				>
					<option value="Incomplete">Incomplete</option>
					<option value="Completed">Completed</option>
				</select>
			</div>

			<div className="form-actions">
				<button type="submit" className="submit-btn">
					{task ? 'Update Task' : 'Add Task'}
				</button>
				<button type="button" className="cancel-btn" onClick={onCancel}>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default TaskForm;