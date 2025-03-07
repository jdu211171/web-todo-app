import React, { useState, useEffect, useRef } from 'react';
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

	const formContainerRef = useRef<HTMLDivElement>(null);

	// Update CSS variable for form height to adjust scrollable area
	useEffect(() => {
		const updateFormHeight = () => {
			if (showForm && formContainerRef.current) {
				const formHeight = formContainerRef.current.offsetHeight;
				document.documentElement.style.setProperty('--form-container-height', `${formHeight}px`);
			} else {
				document.documentElement.style.setProperty('--form-container-height', '0px');
			}
		};

		// Initial update
		updateFormHeight();

		// Update after a small delay to ensure DOM is updated
		const timeoutId = setTimeout(updateFormHeight, 50);

		// Update on window resize
		window.addEventListener('resize', updateFormHeight);

		return () => {
			window.removeEventListener('resize', updateFormHeight);
			clearTimeout(timeoutId);
		};
	}, [showForm]);

	// Fetch tasks
	const fetchTasks = async () => {
		try {
			setLoading(true);
			const data = await TaskService.getTasks(filter);
			setTasks(data);
			setError(null);
		} catch (err) {
			setError('タスクの取得に失敗しました。もう一度お試しください。');
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
				showNotification('タスクが正常に更新されました！', 'success');
			} else {
				// Create new task
				await TaskService.createTask(task);
				showNotification('タスクが正常に作成されました！', 'success');
			}

			setShowForm(false);
			setEditingTask(null);
			fetchTasks();
		} catch (err) {
			showNotification('タスクの保存に失敗しました。もう一度お試しください。', 'error');
			console.error(err);
		}
	};

	// Handle task deletion
	const handleDelete = async (id: number) => {
		if (window.confirm('このタスクを削除してもよろしいですか？')) {
			try {
				await TaskService.deleteTask(id);
				showNotification('タスクが正常に削除されました！', 'success');
				fetchTasks();
			} catch (err) {
				showNotification('タスクの削除に失敗しました。もう一度お試しください。', 'error');
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
			const statusText = status === 'Completed' ? '完了' : '未完了';
			showNotification(`タスクを${statusText}に設定しました！`, 'success');
			fetchTasks();
		} catch (err) {
			showNotification('タスクの状態の更新に失敗しました。もう一度お試しください。', 'error');
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
					<label htmlFor="status-filter">ステータスでフィルター:</label>
					<select
						id="status-filter"
						name="status"
						value={filter.status || 'all'}
						onChange={handleFilterChange}
					>
						<option value="all">すべて</option>
						<option value="Incomplete">未完了</option>
						<option value="Completed">完了</option>
					</select>
				</div>

				<button className="add-task-btn" onClick={() => {
					setEditingTask(null);
					setShowForm(true);
				}}>
					新しいタスクを追加
				</button>
			</div>

			{/* Task form */}
			{showForm && (
				<div className="task-form-container" ref={formContainerRef}>
					<h2>{editingTask ? 'タスクを編集' : '新しいタスクを追加'}</h2>
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
				<h2 className="task-list-label">タスク一覧 {loading && '(読み込み中...)'}</h2>

				{error && <div className="error-message">{error}</div>}

				{!loading && tasks.length === 0 && (
					<div className="empty-state">
						<p>タスクが見つかりません。最初のタスクを追加してください！</p>
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