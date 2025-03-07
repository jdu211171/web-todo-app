import Button from '@/components/Button'
import { Link } from 'react-router'

function ErrorPage() {
	return (
		<div className='flex flex-col gap-6 min-h-screen justify-center items-center overflow-x-hidden overflow-y-hidden'>
			<h1 className='text-[64px] leading-none font-medium'>
				<span className='block font-light'>Requested Page</span>
				<span className='block'>Can't Be Found</span>
			</h1>
			<span className='text-[20px] font-normal italic text-gray-navy'>
				Return to the home page and try again.
			</span>
			<Link to='/'>
				<Button>Back To Home</Button>
			</Link>
		</div>
	)
}

export default ErrorPage
