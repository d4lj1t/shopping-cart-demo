'use client';

import React from 'react';

type ButtonProps = {
	onButtonClick: () => void;
	children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({onButtonClick, children}) => (
	<button onClick={onButtonClick} className='p-2 bg-blue-200 cursor-pointer mt-5'>
		{children}
	</button>
);

export default Button;
