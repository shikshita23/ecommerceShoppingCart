import React from 'react'
import { Outlet } from 'react-router-dom';

import Navbar from '../Navbar'
import Sidebar from '../Sidebar';
const UserLayout = () => {
  console.log("userLayout")
  return (
    <div className='flex flex-col'>
      <Navbar />
      <div className=' flex flex-1'>
        <Sidebar size={5} />
        <main className='flex-1   bg-[#eef2f6] me-3 rounded  '>
          <div className='bg-white m-4  rounded-3xl'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default UserLayout
