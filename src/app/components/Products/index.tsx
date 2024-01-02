import React from 'react';

import {type Product} from '@/app/types';
import Products from '@/app/components/Products/products';

async function getProducts(): Promise<Product[]> {
	try {
		const res = await fetch('http://localhost:4000/products');

		if (!res.ok) {
			throw new Error(`HTTP error! Status: ${res.status}`);
		}

		const data = await res.json() as Product[];
		return data;
	} catch (error) {
		console.error('Error in getProducts:', error);
		throw new Error('Failed to fetch products');
	}
}

export default async function ProductsPage(): Promise<React.ReactElement> {
	const products: Product[] = await getProducts();

	return (
		<Products products={products}/>
	);
}
