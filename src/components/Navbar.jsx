import React from 'react'

const Navbar = () => {
  return (
    <div className='text-white flex justify-between bg-blue-800 p-2 px-3'>
        <div className="logo font-bold">iTask</div>
      <ul className='flex gap-4'>
        <li className='hover:cursor-pointer'>Home</li>
        <li className='hover:cursor-pointer'>About</li>
        <li className='hover:cursor-pointer'>Contacts</li>
      </ul>
    </div>
  )
}

export default Navbar
