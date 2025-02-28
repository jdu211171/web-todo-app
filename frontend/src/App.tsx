import './App.css'
import MainLayout from './layouts/MainLayout'
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Login from './pages/Login'

interface RouteConfig {
	path: string
	element: React.ReactNode
	errorElement?: React.ReactNode
	children?: RouteConfig[]
}

function App() {
	const routes: RouteConfig[] = [
		{
			path: '/',
			element: <MainLayout />,
			errorElement: <ErrorPage />,
			children: [
				{
					path: '',
					element: <Home />,
				},
				{
					path: 'login',
					element: <Login />,
				},
			],
		},
	]

	const router = createBrowserRouter(routes)

	return <RouterProvider router={router} />
}

export default App
