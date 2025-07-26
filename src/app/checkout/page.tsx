'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import { useCart } from '@/context/CartContext'
import { useSearchParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'

// Initialize Stripe with your publishable key
// IMPORTANT: Replace these with your actual Stripe keys from your Stripe dashboard
// For testing: Use test keys (pk_test_...)
// For production: Use live keys (pk_live_...)

// TEMPORARY TEST KEY - Replace with your actual key
const stripePromise = loadStripe('pk_live_51RJNLXGEfqGR0aXGqkdOb5BG3gRtCZ2xSsH2sBYP1v37IESetTQ1oY2jxFjx0EDvOb0O4o0Qguzz6Ks1kzCheom500UitVfWNz')

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
}

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
    const searchParams = useSearchParams()
  const { cartState } = useCart()
  
  let discount = searchParams.get('discount') || '0'
  let ship = searchParams.get('ship') || '0'
  
  const [totalCart, setTotalCart] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    let total = 0
    cartState.cartArray.forEach(item => {
      total += item.price * item.quantity
    })
    setTotalCart(total)
  }, [cartState.cartArray])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Create payment intent on the server
      const response = await fetch('http://localhost:8000/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalCart - Number(discount) + Number(ship),
          currency: 'usd',
        }),
      })

      const { clientSecret, error: serverError } = await response.json()

      if (serverError) {
        setError(serverError)
        setLoading(false)
        return
      }

      // Confirm payment with Stripe
      const { error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      })

      if (paymentError) {
        setError(paymentError.message || 'Payment failed')
      } else {
        setSuccess(true)
        // Here you can redirect to success page or clear cart
      }
    } catch (err) {
      setError('An error occurred during payment')
    }

    setLoading(false)
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="text-green-600 text-2xl font-bold mb-4">Payment Successful!</div>
        <div className="text-gray-600">Your order has been placed successfully.</div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-surface p-6 border border-line rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
        <div className="mb-4">
          <CardElement options={cardElementOptions} />
        </div>
        {error && (
          <div className="text-red-600 mb-4">{error}</div>
        )}
        <button
          type="submit"
          disabled={!stripe || loading}
          className="button-main w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : `Pay $${(totalCart - Number(discount) + Number(ship)).toFixed(2)}`}
        </button>
      </div>
    </form>
  )
}

const Checkout = () => {
  const searchParams = useSearchParams()
  let discount = searchParams.get('discount') || '0'
  let ship = searchParams.get('ship') || '0'

  const { cartState } = useCart()
  let [totalCart, setTotalCart] = useState<number>(0)

  useEffect(() => {
    let total = 0
    cartState.cartArray.forEach(item => {
      total += item.price * item.quantity
    })
    setTotalCart(total)
  }, [cartState.cartArray])

    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
            <div id="header" className='relative w-full'>
        <MenuOne />
        <Breadcrumb heading='Checkout' subHeading='Complete your purchase' />
            </div>
            <div className="cart-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex justify-between">
                        <div className="left w-1/2">
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
                        </div>
                        <div className="right w-5/12">
                            <div className="checkout-block">
                                <div className="heading5 pb-3">Your Order</div>
                                <div className="list-product-checkout">
                                    {cartState.cartArray.length < 1 ? (
                                        <p className='text-button pt-3'>No product in cart</p>
                                    ) : (
                    cartState.cartArray.map((product, index) => (
                      <div key={index} className="item flex items-center justify-between w-full pb-5 border-b border-line gap-6 mt-5">
                                                    <div className="bg-img w-[100px] aspect-square flex-shrink-0 rounded-lg overflow-hidden">
                                                        <Image
                                                            src={product.thumbImage[0]}
                                                            width={500}
                                                            height={500}
                                                            alt='img'
                                                            className='w-full h-full'
                                                        />
                                                    </div>
                                                    <div className="flex items-center justify-between w-full">
                                                        <div>
                                                            <div className="name text-title">{product.name}</div>
                                                            <div className="caption1 text-secondary mt-2">
                                                                <span className='size capitalize'>{product.selectedSize || product.sizes[0]}</span>
                                                                <span>/</span>
                                                                <span className='color capitalize'>{product.selectedColor || product.variation[0].color}</span>
                                                            </div>
                                                        </div>
                                                        <div className="text-title">
                                                            <span className='quantity'>{product.quantity}</span>
                                                            <span className='px-1'>x</span>
                                                            <span>
                                                                ${product.price}.00
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                        ))
                                    )}
                                </div>
                                <div className="discount-block py-5 flex justify-between border-b border-line">
                                    <div className="text-title">Discounts</div>
                                    <div className="text-title">-$<span className="discount">{discount}</span><span>.00</span></div>
                                </div>
                                <div className="ship-block py-5 flex justify-between border-b border-line">
                                    <div className="text-title">Shipping</div>
                                    <div className="text-title">{Number(ship) === 0 ? 'Free' : `$${ship}.00`}</div>
                                </div>
                                <div className="total-cart-block pt-5 flex justify-between">
                                    <div className="heading5">Total</div>
                  <div className="heading5 total-cart">${(totalCart - Number(discount) + Number(ship)).toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Checkout