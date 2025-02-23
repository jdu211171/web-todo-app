import { Link } from 'react-router'

function ErrorPage() {
	return (
		<div className='flex flex-col gap-6 h-screen justify-center items-center'>
			<h1>
				<span className='block font-light'>Requested Page</span>
				<span className='block'>Can't Be Found</span>
			</h1>
			<span className='text-[20px] font-normal italic text-gray-navy'>
				Return to the home page and try again.
			</span>

			<Link to='/' className='btn'>
				Back To Home
			</Link>
		</div>
	)
}

export default ErrorPage
