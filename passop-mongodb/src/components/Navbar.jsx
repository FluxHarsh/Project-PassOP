import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800'>
            
      <div className="mycontainer justify-between px-4 py-5 items-center h-14  flex ">

        <div className='logo font-bold text-white'> 
          <span className='text-green-500'> &lt; </span>
          <span className='text-xl'>Pass</span>
          <span className='text-green-500 text-xl'>OP/&gt; </span>
        </div>

        <button className='justify-center items-center rounded-full text-white bg-green-500 my-5  flex gap-2 ring-white ring-1'>
          <img className='invert w-10 p-1' src="icons/github.svg" alt="" />
          <span className='font-bold px-2 text-sm'>GitHub</span>
        </button>
      </div>

    </nav>
  )
}

export default Navbar
