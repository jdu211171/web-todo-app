import { Link } from 'react-router'

function MenuLinks() {
	const quizzes = [
		{
			title: 'Login Into Account',
			icon: '../icons/login.png',
			href: '/login',
		},
		{
			title: 'Register Account',
			icon: '../icons/register.png',
			href: '/register',
		},
		{
			title: 'Use as Guest',
			icon: '../icons/guest.png',
			href: '/guest',
		},
	]

	return (
		<div>
			<div className='menu-list'>
				{quizzes &&
					quizzes.map(item => {
						return (
							<Link
								to={item.href}
								key={item.title}
								className='menu-item header-logo'
							>
								<figure>
									<img src={item.icon} alt={item.title} />
								</figure>
								<span>{item.title}</span>
							</Link>
						)
					})}
			</div>
		</div>
	)
}

export default MenuLinks
