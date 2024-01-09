import {getSession, withApiAuthRequired} from '@auth0/nextjs-auth0';
import {NextResponse} from 'next/server';
import data from '@/data/products.json';

// eslint-disable-next-line @typescript-eslint/naming-convention
const GET = withApiAuthRequired(async () => NextResponse.json(data.products));

export {GET};
