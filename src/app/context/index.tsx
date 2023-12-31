import React, {createContext, useState, type ReactNode, type Dispatch, type SetStateAction} from 'react';
import {type Product} from '@/app/types';

type CartItem = Product;

type ContextType = {
	children: ReactNode;
	cartItems: CartItem[];
	handleAddToCart: (newItem: CartItem) => void;
};

export const Context = createContext<ContextType | undefined>(undefined);

function GlobalState({children}: ContextType) {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	function handleAddToCart(newItem: CartItem) {
		setCartItems((prevItems: Product[]) => [...prevItems, newItem]);
	}

	return <Context.Provider value={{cartItems, handleAddToCart, children}}>{children}</Context.Provider>;
}

export default GlobalState;
