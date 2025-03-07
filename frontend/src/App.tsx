import './App.css'
import TaskList from './components/TaskList';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h1>Task Management App</h1>
			</header>
			<main>
				<TaskList />
			</main>
			<footer>
				<p>Simple Task Management App</p>
			</footer>
		</div>
	);
}

export default App;