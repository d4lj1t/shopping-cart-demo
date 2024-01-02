'use client';

import React, {useContext} from 'react';
import Link from 'next/link';
import {Context} from '@/app/context';
import {type Product, type ContextType} from '@/app/types';
import styles from '@/app/components/Products/index.module.scss';

export default async function Basket() {
	const {cartItems} = useContext(Context) as ContextType;
	console.log('basket page', cartItems);
	return (
		<>
			<Link href='/home' className='flex  flex-col items-center'>Home</Link>
			<div className='flex flex-wrap ghap-4 p-5'>
				{cartItems && cartItems.length > 0
					&& cartItems.map((item: Product, index: number) => (
						<div className={styles.item} key={index}>
							<h1 className={styles.item__title}>{item.title}</h1>
							<h1>
								{item.currency}
								{item.priceValue}
							</h1>
							<button className='p-2 bg-blue-200 cursor-pointer mt-5'>Remove from basket</button>
						</div>
					))
				}
				{!cartItems.length && <div>No items added</div>}
			</div>
		</>
	);
}
