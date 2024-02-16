import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import { getURL } from '@/lib/helpers';
import { createOrRetrieveCustomer } from '@/lib/supabaseAdmin';

export async function POST(request: Request) {
  const { items, quantity = 1, metadata = {} } = await request.json();

  try {
    const supabase = createRouteHandlerClient({
      cookies,
    });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const customer = await createOrRetrieveCustomer({
      uuid: user?.id || '',
      email: user?.email || '',
    });

    const lineItems = items.map((item: any) => ({
      price: item.price.id,
      quantity: quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer,
      line_items: lineItems,
      mode: 'payment',

      success_url: `${getURL()}/purchases`,
      cancel_url: `${getURL()}/`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.log(err);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
