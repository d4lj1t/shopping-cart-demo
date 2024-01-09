import React from 'react';

import ProductsPage from '@/app/components/Products';
import Link from 'next/link';

export default function Home() {
	return (
		<>
			<Link href='/basket' className='flex  flex-col items-center'>
				Basket
			</Link>
			<ProductsPage />
		</>
	);
}
