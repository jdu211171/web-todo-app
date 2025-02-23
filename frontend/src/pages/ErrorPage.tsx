//react-router-dom
import { Link, useRouteError } from 'react-router'

function ErrorPage() {
	return (
		<div className='error-container container'>
			<div>
				<h3>404 Page Not Found</h3>
			</div>
			<Link to='/' className='btn'>
				Go to home
			</Link>
		</div>
	)
}

//return (
//	<div className='error-container container'>
//		<div>
//			<h3>Oops! Something went wrong</h3>
//		</div>
//		<Link to='/' className='btn'>
//			Go to home
//		</Link>
//	</div>
//)

export default ErrorPage
