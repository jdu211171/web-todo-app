import './App.css';
import TaskList from './components/TaskList';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h1>タスク管理アプリ</h1>
			</header>
			<main>
				<TaskList />
			</main>
			<footer>
				<p>シンプルなタスク管理アプリ</p>
			</footer>
		</div>
	);
}

export default App;