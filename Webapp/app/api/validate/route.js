// app/api/validate/route.js

import { validate } from '@how2validate/how2validate';

export async function POST(request) {
  // Destructure the parameters from the request body
  const { provider, service, secret, response, report } = await request.json();

  // Check if all required parameters are present
  if (!provider || !service || !secret || typeof response !== 'boolean' || typeof report !== 'boolean') {
    return new Response(JSON.stringify({ error: 'All parameters are required and response/report must be boolean' }), { status: 400 });
  }

  try {
    // Call the validate function with the correct types
    const validationRes = await validate(provider, service, secret, response, report);

    // Return the validation result as a JSON response
    return new Response(JSON.stringify(validationRes), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error during validation:', error);
    return new Response(JSON.stringify({ error: 'Validation failed', details: error.message }), { status: 500 });
  }
}
