import {type NextRequest, NextResponse} from 'next/server';
import {getSession, withApiAuthRequired} from '@auth0/nextjs-auth0';
import connectToMongoDb from '@/app/libs/mongodb';
import basketModel from '@/app/models/basket';

// eslint-disable-next-line @typescript-eslint/naming-convention
const GET = withApiAuthRequired(async (request: NextRequest) => {
	try {
		await connectToMongoDb();

		const session = await getSession();

		console.log('session', session);

		if (!session?.accessToken || !session.user) {
			console.log('Invalid or missing access token or user in the session');
			return NextResponse.json({error: 'Invalid or missing access token or user in the session'}, {status: 401});
		}

		const userId = session.user.sub as string;

		const userBasket = await basketModel.find({userId});

		return NextResponse.json(userBasket, {
			headers: {
				'Cache-Control': 'no-store, max-age=0, must-revalidate',
			},
		});
	} catch (error: any) {
		console.error('Error fetching basket:', error);

		const errorMessage = error instanceof Error && error.message ? error.message : 'Failed to fetch basket';

		console.log('Error Message:', errorMessage);

		return NextResponse.json({error: errorMessage}, {status: 500});
	}
});

export {GET};
