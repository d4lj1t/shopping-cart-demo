import React from 'react';
import {getSession} from '@auth0/nextjs-auth0';
import Products from '@/app/components/Products';

export default async function Home() {
	const session = await getSession();
	return (
		<div>
			{session?.user && (
				<div>
					<div>
						{session.user.email} - <a className='flex  flex-col items-center' href='/api/auth/logout'>Logout</a>
					</div>
				</div>
			)}
			<Products/>
		</div>
	);
}
