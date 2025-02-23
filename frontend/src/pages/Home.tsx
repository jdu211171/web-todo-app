import MenuLinks from '../components/MenuLinks'

function Home() {
	return (
		<section className='mx-auto grid max-w-[1260px] grid-cols-1 gap-5 px-[50px] max-md:grid-cols-1 max-md:px-[24px] md:grid-cols-2'>
			<div className='flex flex-col gap-6'>
				<h1 className='mb-12 font-medium leading-none text-[64px] md:text-[64px]'>
					<span className='block font-light'>Plan, Act</span>
					<span className='block'>Succeed</span>
				</h1>
				<span className='text-[20px] font-normal italic text-gray-navy'>
					Set your goals and achieve greatness!
				</span>
			</div>
			<div className='flex flex-col gap-6'>
				<MenuLinks />
			</div>
		</section>
	)
}

export default Home
