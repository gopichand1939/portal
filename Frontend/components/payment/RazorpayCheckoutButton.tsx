'use client'

import { useMemo, useState } from 'react'
import Script from 'next/script'
import { CreditCard } from 'lucide-react'

declare global {
  interface Window {
    Razorpay?: any
  }
}

type Props = {
  amountRupees?: number
  buttonText?: string
  description?: string
  onSuccessRedirectTo?: string
}

export default function RazorpayCheckoutButton({
  amountRupees = Number(process.env.NEXT_PUBLIC_COURSE_PRICE_RUPEES ?? 1),
  buttonText = 'Proceed to Payment',
  description = 'Placement Course Access',
  onSuccessRedirectTo = '/course-details',
}: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const displayAmount = useMemo(() => {
    const n = Number(amountRupees)
    return Number.isFinite(n) ? n : 1
  }, [amountRupees])

  const startPayment = async () => {
    setError(null)
    setLoading(true)
    try {
      const createRes = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amountRupees: displayAmount,
          currency: 'INR',
          notes: { purpose: 'course_unlock' },
        }),
      })

      const orderData = await createRes.json()
      if (!createRes.ok) {
        throw new Error(orderData?.error ?? 'Failed to create order')
      }

      if (!window.Razorpay) {
        throw new Error('Razorpay SDK failed to load')
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Learning Portal',
        description,
        order_id: orderData.orderId,
        handler: async (response: any) => {
          const verifyRes = await fetch('/api/razorpay/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          })
          const verifyData = await verifyRes.json()
          if (!verifyRes.ok || !verifyData?.ok) {
            setError('Payment verification failed. Please contact support.')
            return
          }

          // Frontend-only unlock flag (demo)
          try {
            localStorage.setItem('courseUnlocked', 'true')
          } catch {}

          window.location.href = onSuccessRedirectTo
        },
        theme: { color: '#2563eb' },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (e: any) {
      setError(e?.message ?? 'Payment failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="w-full">
        <button
          onClick={startPayment}
          disabled={loading}
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <CreditCard className="h-5 w-5" />
          {loading ? 'Starting Payment…' : buttonText}
        </button>
        {error && (
          <p className="mt-3 text-sm font-medium text-red-600">{error}</p>
        )}
        <p className="mt-3 text-xs text-gray-500">
          Test mode: amount ₹{displayAmount}
        </p>
      </div>
    </>
  )
}

