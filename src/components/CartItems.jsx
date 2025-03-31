import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { CartContext } from './CartContext';

const CartItems = () => {
     const { cartItems, handleDelete, handleQuantityUpdate } = useContext(CartContext);
     return (
          <div className='py-10 px-10 '>
               <div className='flex justify-between '>
                    <div className='font-bold text-2xl'>My shopping Cart</div>
                    <div className='flex align-bottom mt-auto'> {cartItems.length} item</div>
               </div>
               <hr className="mt-5 mb-18  text-gray-300 " />
               <div className='mt-8'>

                    <div className='grid grid-cols-4 mb-4'>
                         <div>
                              <div className='font-medium'>Products</div>
                         </div>
                         <div className='quantity grid grid-cols-3 h-8 w-30 mt-auto mb-auto font-medium '>
                              Quantity
                         </div>
                         <div className='totalPrice flex justify-end font-medium'>
                              Total Price
                         </div>
                    </div>
               </div>
               <div className='mt-8'>
                    {cartItems.map((item, index) => (
                         <div key={index} className='grid grid-cols-4 mb-4'>
                              <div>
                                   <div className='font-medium'>{item.name}</div>
                                   <div className='text-[#FF5722] font-semibold'>$ {item.price}</div>
                              </div>
                              <div className='quantity grid grid-cols-3 h-8 w-30 mt-auto mb-auto '>
                                   <button className='  rounded-xl  hover:bg-gray-200 cursor-pointer ' onClick={() => handleQuantityUpdate(item.productId, item.quantity - 1)} disabled={item.quantity < 1}>-</button>
                                   <div className='quantity flex justify-center'>{item.quantity}</div>
                                   <button className=' rounded-xl hover:bg-gray-200 cursor-pointer' onClick={() => handleQuantityUpdate(item.productId, item.quantity + 1)} >+</button>
                              </div>
                              <div className='totalPrice flex justify-end'>
                                   {(item.quantity * item.price).toFixed(2)}
                              </div>
                              <div className='remove text-blue-600 flex justify-end'>
                                   <FontAwesomeIcon icon={faTrash} className='cursor-pointer' onClick={() => handleDelete(item.id)} />
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     )
}

export default CartItems

