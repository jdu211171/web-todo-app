import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router'

const toggleMode = () => {
	return localStorage.getItem('darkMode') || 'light'
}

function Navbar() {
	const { title } = useParams()
	const [theme, setTheme] = useState(toggleMode())

	//theme toggle function

	const handleThemeToggle = () => {
		const newTheme = theme == 'dark-mode' ? 'light' : 'dark-mode'
		setTheme(newTheme)
	}

	useEffect(() => {
		document.body.classList.remove('dark-mode', 'light')
		document.body.classList.add(theme)
		localStorage.setItem('darkMode', theme)
	}, [theme])

	return (
		<header className='header'>
			<div className='flex justify-between align-center'>
				<div>
					{title && (
						<Link to='/' className='header-logo'>
							<figure>
								<img
									src={`../assets/icon-${title.toLowerCase()}.svg`}
									alt={`${title}icons`}
								/>
							</figure>
							<span>{title}</span>
						</Link>
					)}
				</div>
				<div>
					<div className='dark-btn' onClick={handleThemeToggle}>
						<input type='checkbox' checked={theme == 'dark-mode'} readOnly />
						<span>
							<span></span>
							<span></span>
						</span>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Navbar
