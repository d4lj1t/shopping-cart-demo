import {type NextRequest, NextResponse} from 'next/server';
import {getSession} from '@auth0/nextjs-auth0';
import {type Product} from '@/app/types';
import connectToMongoDb from '@/app/libs/mongodb';
import basketModel from '@/app/models/basket';

// eslint-disable-next-line @typescript-eslint/naming-convention
export async function POST(request: NextRequest) {
	try {
		await connectToMongoDb();

		const session = await getSession();

		if (!session?.accessToken || !session.user) {
			console.log('Invalid or missing access token or user in the session');
			return NextResponse.json({error: 'Invalid or missing access token or user in the session'}, {status: 401});
		}

		const userId = session.user.sub as string;

		const {title, currency, priceValue} = await request.json() as Product;

		await basketModel.create({userId, title, currency, priceValue});

		return NextResponse.json({message: 'item added to basket'}, {status: 201});
	} catch (error: any) {
		console.error('Error adding item to basket:', error);

		const errorMessage = error instanceof Error && error.message ? error.message : 'Failed to add item to basket';

		return NextResponse.json({error: errorMessage}, {status: 500});
	}
}
