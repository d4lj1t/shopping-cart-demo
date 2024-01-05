import {NextResponse} from 'next/server';
import {type Product} from '@/app/types';
import connectToMongoDb from '@/app/libs/mongodb';
import basketModel from '@/app/models/basket';

// eslint-disable-next-line @typescript-eslint/naming-convention
export async function POST(request: {json: () => Promise<Product>}) {
	try {
		await connectToMongoDb();
		const {title, currency, priceValue} = await request.json();

		await basketModel.create({title, currency, priceValue});

		return NextResponse.json({message: 'item added to basket'}, {status: 201});
	} catch (error: any) {
		console.error('Error adding item to basket:', error);

		const errorMessage = error instanceof Error && error.message ? error.message : 'Failed to add item to basket';

		return NextResponse.json({error: errorMessage}, {status: 500});
	}
}
