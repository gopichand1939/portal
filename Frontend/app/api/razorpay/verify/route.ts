import crypto from 'crypto'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

type VerifyBody = {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

export async function POST(req: Request) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keySecret) {
    return NextResponse.json(
      { error: 'Missing RAZORPAY_KEY_SECRET' },
      { status: 500 }
    )
  }

  let body: VerifyBody
  try {
    body = (await req.json()) as VerifyBody
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const payload = `${razorpay_order_id}|${razorpay_payment_id}`
  const expected = crypto
    .createHmac('sha256', keySecret)
    .update(payload)
    .digest('hex')

  const ok = expected === razorpay_signature
  return NextResponse.json({ ok })
}

