import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex flex-col justify-center items-center fixed bottom-0 w-full
        '>
            <div className='logo font-bold text-black texy2x
            '>
                <span className='text-green-500'> &lt; </span>
                <span className='text-xl'>Pass</span>
                <span className='text-green-500 text-xl'>OP/&gt; </span>
            </div>
            <div className='flex justify-center items-center'>
                Created with <img className='w-5 mx-2' src="icons/heart.png" alt="" /> by Harsh
            </div>

        </div>
    )
}

export default Footer
