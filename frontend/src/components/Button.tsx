interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	variant?: 'primary' | 'secondary'
	className?: string
}

function Button({ children, className = '', ...props }: ButtonProps) {
	return (
			<button
				className={`
        bg-[#a729f5] text-white 
        rounded-[24px] px-16 py-8 
        text-[28px] leading-none
        font-medium font-[Rubik]
        cursor-pointer capitalize
        hover:bg-[#a729f5]/50
        dark:text-white
        max-[500px]:text-[18px] 
        max-[500px]:py-[19px] max-[500px]:px-[19px]
        max-[500px]:rounded-[12px]
        ${className}
	      `}
				{...props}
			>
				{children}
			</button>
	)
}

export default Button
