import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='h-screen'>
        <h1 className='text-4xl text-center font-bold text-white py-4 '>MISSING DOCUMENT TRACKER</h1>
        <main className='flex flex-wrap'>
            <div className="cards flex flex-wrap justify-center items-center">
                <Link href={'/docs/invoices'}><div className="card">INVOICES</div></Link> 
                <div className="card">CASH ADVANCES</div>
                <div className="card">CLEARINGS</div>
                <div className="card">RECEIPTS</div>
                <div className="card">ER</div>
            </div>
        </main>

    </div>
  )
}

export default page
