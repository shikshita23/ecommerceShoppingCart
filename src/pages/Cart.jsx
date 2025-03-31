import React from 'react'
import CartItems from '../components/CartItems'
import OrderSummary from '../components/OrderSummary'

const Cart = () => {
  return (
    <div className='flex justify-between'>
      <CartItems/>
      <OrderSummary/>
    </div>
  )
}

export default Cart
