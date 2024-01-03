'use client';

import React, {useState, useEffect} from 'react';

import {type Product} from '@/app/types';
import Products from '@/app/components/Products/products';

export default function ProductsPage() {
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		const fetchDataFromApi = () => {
			setLoading(true);
			fetch('/api/products', {
				headers: {
					Accept: 'application/json',
					method: 'GET',
				},
			})
				.then(async response => {
					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}

					return response.json();
				})
				.then(data => {
					setProducts(data.products as Product[]);
				})
				.catch(error => {
					console.error('Error in fetchDataFromApi:', error);
				})
				.finally(() => {
					setLoading(false);
				});
		};

		fetchDataFromApi();
	}, []);

	return (
		<>
			{products.length > 0 && (
				<Products products={products} />
			)}
		</>
	);
}
