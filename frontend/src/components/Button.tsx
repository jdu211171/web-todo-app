import { PartyPopperIcon as Party } from 'lucide-react'
import { useState } from 'react'

export default function ConfirmButton() {
	const [isDark, setIsDark] = useState(false)

	return (
		<div className='flex gap-4 p-4'>
			<button
				onClick={() => setIsDark(!isDark)}
				className={`
          inline-flex items-center gap-2 px-6 py-3 
          rounded-xl text-base font-medium
          transition-colors duration-200
          ${
						isDark
							? 'bg-[#313E51] text-white hover:bg-[#313E51]/90'
							: 'bg-white text-[#313E51] hover:bg-white/90 shadow-md'
					}
        `}
			>
				<Party
					className={`w-4 h-4 ${!isDark ? 'text-blue-500' : 'text-white'}`}
				/>
				Confirm
			</button>
		</div>
	)
}
