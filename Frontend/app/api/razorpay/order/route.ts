import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

type CreateOrderBody = {
  amountRupees: number
  currency?: string
  receipt?: string
  notes?: Record<string, string>
}

export async function POST(req: Request) {
  const keyId =
    process.env.RAZORPAY_KEY_ID ?? process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    return NextResponse.json(
      {
        error: 'Missing Razorpay env vars',
        missing: {
          RAZORPAY_KEY_ID: !process.env.RAZORPAY_KEY_ID,
          NEXT_PUBLIC_RAZORPAY_KEY_ID: !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          RAZORPAY_KEY_SECRET: !process.env.RAZORPAY_KEY_SECRET,
        },
      },
      { status: 500 }
    )
  }

  let body: CreateOrderBody
  try {
    body = (await req.json()) as CreateOrderBody
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const amountRupees = Number(body.amountRupees)
  if (!Number.isFinite(amountRupees) || amountRupees <= 0) {
    return NextResponse.json({ error: 'Invalid amountRupees' }, { status: 400 })
  }

  const amountPaise = Math.round(amountRupees * 100)
  const currency = body.currency ?? 'INR'

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64')

  const res = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: amountPaise,
      currency,
      receipt: body.receipt ?? `receipt_${Date.now()}`,
      notes: body.notes ?? {},
    }),
  })

  const data = await res.json().catch(() => null)
  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to create order', details: data },
      { status: 500 }
    )
  }

  return NextResponse.json({
    keyId,
    orderId: data.id,
    amount: data.amount,
    currency: data.currency,
  })
}

