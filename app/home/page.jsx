import React from 'react'

const page = () => {
  return (
    <div className='h-screen'>
        <h1 className='text-4xl text-center font-bold text-white py-4 '>MISSING INVOICE TRACKER</h1>
        <main className='grid place-content-center h-[80vh]'>
            <div className="cards">
                <div className="card">INVOICES</div>
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
