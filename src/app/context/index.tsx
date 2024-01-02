'use client';

import React, {createContext, useState, type ReactNode} from 'react';
import {type Product} from '@/app/types';

type CartItem = Product;

type ContextType = {
	children: ReactNode;
	cartItems: CartItem[];
	handleAddToCart: (newItem: CartItem) => void;
};

export const Context = createContext<ContextType | undefined>(undefined);

export const GlobalStateProvider: React.FC<{children: ReactNode}> = ({children}) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const handleAddToCart = (newItem: CartItem) => {
		setCartItems(prevItems => [...prevItems, newItem]);
		console.log('cartItems', newItem);
	};

	const contextValue: ContextType = {
		cartItems,
		handleAddToCart,
		children,
	};

	return (
		<Context.Provider value={contextValue}>
			{children}
		</Context.Provider>
	);
};

export default GlobalStateProvider;
