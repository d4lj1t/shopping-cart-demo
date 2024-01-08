'use client';

import React from 'react';
import Button from '@/app/components/Button';
import {postCartItem} from '@/app/services/postCartItem';
import {type Product} from '@/app/types';

type AddButtonProps = {
	item: Product;
};

const handleAddToCart = async (newItem: Product) => {
	try {
		await postCartItem(newItem);
	} catch (error) {
		console.log('Failed to post:', error);
	}
};

export default function AddButton({item}: AddButtonProps) {
	return <Button onButtonClick={async () => handleAddToCart(item)}>Add to basket</Button>;
}
