import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faHouse, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { Badge } from '@mui/material'
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { CartContext } from './CartContext';

const Sidebar = () => {
     const { totalItem } = useContext(CartContext)
     return (
          <div className='w-47 flex flex-col items-center gap-5'>
               <div >
                    <ul className=' flex flex-col justify-between gap-10 pt-20 text-black font-medium'>
                         <li>
                              <NavLink to="/">
                                   <FontAwesomeIcon icon={faHouse} className="text-sm me-4" />
                                   <span>Product List</span>
                              </NavLink>
                         </li>
                         <li>
                              <NavLink to="/cart">
                                   <FontAwesomeIcon icon={faShoppingCart} className='text-sm me-4'></FontAwesomeIcon>
                                   <Badge color="primary" badgeContent={totalItem}>
                                        Cart
                                   </Badge>
                              </NavLink>
                         </li>
                         <li>
                              <NavLink to="/company">
                                   <FontAwesomeIcon icon={faBuilding} className='text-sm me-4'></FontAwesomeIcon>
                                   Company List
                              </NavLink>
                         </li>
                         <li>
                              <NavLink to="/user">
                                   <FontAwesomeIcon icon={faUser} className='text-sm me-4'></FontAwesomeIcon>
                                   Users
                              </NavLink>
                         </li>
                    </ul>
               </div>
          </div>
     )
}

export default Sidebar
