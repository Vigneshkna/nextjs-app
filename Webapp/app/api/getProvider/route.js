// app/api/getProvider/route.js

import { getProvider } from '@how2validate/how2validate';

export async function GET() {
  try {
    const providers = await getProvider();
    return new Response(JSON.stringify(providers), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching providers:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch providers' }), { status: 500 });
  }
}
