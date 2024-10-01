// app/api/getServices/route.js

import { getService } from '@how2validate/how2validate';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const provider = searchParams.get('provider');
  console.log(provider);

  if (!provider) {
    return new Response(JSON.stringify({ error: 'Provider is required' }), { status: 400 });
  }

  try {
    const services = await getService(provider);
    return new Response(JSON.stringify(services), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch services' }), { status: 500 });
  }
}
