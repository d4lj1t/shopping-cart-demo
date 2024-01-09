'use client';

import React, {useEffect, useState} from 'react';
import {type Product} from '@/app/types';
import Products from '@/app/components/Products/products';
import {baseApiUrl} from '@/app/constants';

type ErrorResponse = {
	error: string;
};

export default async function ProductsPage() {
	const [products, setProducts] = useState<Product[] | undefined>(undefined);

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch(`${baseApiUrl}/api/products`, {
					method: 'GET',
				});

				if (!res.ok) {
					throw new Error(`HTTP error! Status: ${res.status}`);
				}

				const data = (await res.json()) as Product[];
				setProducts(data);
			} catch (error) {
				console.error('Error in getProducts:', error);
				const errorMessage = error instanceof Error && error.message ? error.message : 'Failed to fetch products';
				const errorResponse: ErrorResponse = {error: errorMessage};

				return errorResponse;
			}
		})();
	}, []);

	return (
		<>
			{products !== undefined && products.length > 0 && (
				<Products products={products} />
			)}
		</>
	);
}
