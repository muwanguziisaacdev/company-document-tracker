import Link from 'next/link'
import React from 'react'

const Docs = () => {
  return (
    <div className='h-screen'>
        <h1 className='text-center pt-28'>Check for Missing Documents</h1>
        <div className='flex justify-evenly items-center h-[80%] flex-wrap'>
            <Link href={'/docs/invoices'}><div className='card-container'>INVOICES</div></Link>
            
            <div className='card-container'>CASH ADVANCES</div>
            <div className='card-container'>EXPENSE REIMBURSMENT</div>
            <div className='card-container'>CLEARINGS</div>
        </div>

    </div>
  )
}

export default Docs