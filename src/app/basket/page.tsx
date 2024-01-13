'use client';

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {type Product} from '@/app/types';
import styles from '@/app/components/Products/index.module.scss';
import {baseApiUrl} from '@/app/constants';

type ErrorResponse = {
	error: string;
};

export default function Basket() {
	const [basket, setBasket] = useState<Product[] | undefined>(undefined);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		(async () => {
			try {
				const res = await fetch(`${baseApiUrl}/api/basket/get`, {
					method: 'GET',
				});

				if (!res.ok) {
					throw new Error(`HTTP error! Status: ${res.status}`);
				}

				const data = await res.json() as Product[];
				setBasket(data);
			} catch (error) {
				console.error('Error in getBasket:', error);
				const errorMessage = error instanceof Error && error.message ? error.message : 'Failed to fetch basket';
				const errorResponse: ErrorResponse = {error: errorMessage};

				return errorResponse;
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	return (
		<>
			<Link href='/home' className='flex  flex-col items-center'>
				Home
			</Link>
			{loading && <div>Loading...</div>}
			<div className='flex flex-wrap gap-4 p-5'>
				{basket !== undefined
					&& basket.length > 0
					&& basket.map((item: Product, index: number) => (
						<div className={styles.item} key={index}>
							<h1 className={styles.item__title}>{item.title}</h1>
							<h1>
								{item.currency}
								{item.priceValue}
							</h1>
						</div>
					))}
				{basket === undefined || (!basket.length && <div>No items added</div>)}
			</div>
		</>
	);
}
