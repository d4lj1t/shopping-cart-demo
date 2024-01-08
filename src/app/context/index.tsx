'use client';

import React, {createContext, useState, useEffect, type ReactNode} from 'react';
import {type Product} from '@/app/types';
import {postCartItem} from '@/app/services/postCartItem';

type CartItem = Product;

type ContextType = {
	children: ReactNode;
	cartItems: CartItem[];
	handleAddToCart: (newItem: CartItem) => void;
	removeFromCart: (index: number) => void;
};

export const Context = createContext<ContextType | undefined>(undefined);

export const GlobalStateProvider: React.FC<{children: ReactNode}> = ({children}) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	const copyCartItems = [...cartItems];
	const handleAddToCart = async (newItem: CartItem) => {
		try {
			await postCartItem(newItem);
			copyCartItems.push(newItem);
			setCartItems(copyCartItems);
		} catch (error) {
			console.log('Failed to post:', error);
		}
	};

	const removeFromCart = (index: number) => {
		copyCartItems.splice(index, 1);
		setCartItems(copyCartItems);
	};

	useEffect(() => {
		const storedCartItems = localStorage.getItem('cartItems');
		const parsedCartItems: Product[] = storedCartItems ? (JSON.parse(storedCartItems) as Product[]) : [];

		setCartItems(parsedCartItems);
	}, []);

	const contextValue: ContextType = {
		cartItems,
		handleAddToCart,
		removeFromCart,
		children,
	};

	return (
		<Context.Provider value={contextValue}>
			{children}
		</Context.Provider>
	);
};

export default GlobalStateProvider;
