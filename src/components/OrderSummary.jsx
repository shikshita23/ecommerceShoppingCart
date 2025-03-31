import { Button } from '@mui/material'
import React, { useContext } from 'react'

import { CartContext } from './CartContext'
import showToast from './ToastMessage/showToast';

const OrderSummary = () => {
  const { totalPrice } = useContext(CartContext);
  const handleClick = () => {
    showToast('success', 'Checked out successfully!')
  }
  return (
    <div className='bg-[#E8E9EB] w-80 h-78 p-5 rounded-2xl mt-10 me-10 mb-10'>
      <span className='text-xl font-medium '>Order Summary</span>
      <hr className='my-2 text-gray-400' />
      <div className='flex justify-between mt-12'>
        <span>Sub Total</span>
        <span>${(totalPrice).toFixed(2)} </span>
      </div>
      <div className='flex justify-between mt-4'>
        <span>Delivery</span>
        <span>Free</span>
      </div>
      <hr className='mt-2 text-gray-400' />
      <div className='flex justify-between mt-5 mb-8'>
        <span className='font-bold'>Total</span>
        <span className='text-[#FF5722] font-bold'>${(totalPrice).toFixed(2)} </span>
      </div>
      <Button variant="contained" className='w-full' onClick={handleClick}>
        Checkout
      </Button>
    </div>
  )
}

export default OrderSummary
