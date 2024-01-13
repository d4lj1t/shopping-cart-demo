import React from 'react';
import {type Product} from '@/app/types';
import Products from '@/app/components/Products/products';
import {baseApiUrl} from '@/app/constants';

type ErrorResponse = {
	error: string;
};

async function getProducts(): Promise<Product[] | ErrorResponse> {
	try {
		const res = await fetch(`${baseApiUrl}/api/products`, {
			method: 'GET',
		});

		if (!res.ok) {
			throw new Error(`HTTP error! Status: ${res.status}`);
		}

		const data = await res.json() as Product[];
		return data;
	} catch (error) {
		console.error('Error in getProducts:', error);
		const errorMessage = error instanceof Error && error.message ? error.message : 'Failed to fetch products';
		const errorResponse: ErrorResponse = {error: errorMessage};

		return errorResponse;
	}
}

export default async function ProductsPage() {
	const products: Product[] | ErrorResponse = await getProducts();

	if ('error' in products) {
		return <p>Error: {products.error}</p>;
	}

	return (
		<>
			{products.length > 0 && (
				<Products products={products} />
			)}
		</>
	);
}
