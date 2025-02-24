import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faFolder, faBuilding } from '@fortawesome/free-regular-svg-icons'
import Link from 'next/link'
import { faCogs, faHome, faThLarge, faList, faTrash, faUpload, faFilePdf } from '@fortawesome/free-solid-svg-icons'

const page = () => {
  return (
    <div className='h-screen'>
      <header>
        <div className="header-wrapper px-5">
          <nav className='flex justify-between  py-4'>
            <h2 className='text-2xl font-bold  font-[cursive]'>MaRDS</h2>
            <input type="text" placeholder='Search' className='border px-4 py-2 w-[20%] rounded-md'/>
            <FontAwesomeIcon icon={faBell} className='w-5'/>
            <div className="dot-menu">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </nav>
        </div>
      </header>
        <main className='grid grid-cols-4 h-[80vh] relative'>
          <aside className='menu-aside-left w-[300px] ml-10 rounded-lg shadow-lg mt-10'>
            <ul className='flex flex-col gap-5 p-5'>
              <Link 
                href={'/'}
                className='flex items-center'
              >
                <FontAwesomeIcon icon={faHome} className='w-6 h-5'/>
                Dashboard</Link>
              <Link 
                href={'/'}
                className='flex items-center'
              >
                <FontAwesomeIcon icon={faFolder} className='w-6 h-5'/>
                Documents</Link>
            </ul>
          </aside>
          <div className="middle-container col-span-3 mt-10">
            <div className="details">
              <h2 className=''>Dashboard</h2>
              <p className=''>Document managment made easier </p>
              <h3 className='mt-10'>Explore</h3>
            </div>
            <div className="cards">
              <div className="card">
                <h3 className='flex flex-col text-center'>
                  Check Missing
                  <span>Documents</span>
              </h3>
              </div>
              <div className="card">
              <h3 className='flex flex-col text-center'>
                  Rename
                  <span>Documents</span>
              </h3>
              </div>
              <div className="card">
              <h3 className='flex flex-col text-center'>
                  Pending
                  <span>Documents</span>
              </h3>
              </div>
              <div className="card">
              <h3 className='flex flex-col text-center'>
                  Completed
                  <span>Documents</span>
              </h3>
              </div>
            </div>

            <div className='mt-8 flex justify-between bg-[#F39C12] p-4 rounded-lg w-[87%]'>

              <div className='flex w-1/5 justify-between'>
                <p className='font-medium text-xl text-[#2C3E50]'>Tasks</p>
                <FontAwesomeIcon icon={faThLarge} className='w-6 text-white'/>
                <FontAwesomeIcon icon={faList} className='w-6 text-white'/>
              </div>

              <div className='flex w-3/6 justify-evenly'>
                <FontAwesomeIcon icon={faTrash} className='w-6 text-red-500'/>
                <FontAwesomeIcon icon={faUpload} className='w-6 text-white text-blue-500'/>
              </div>

            </div>

            <div>
              <div className="container">
                <table>
                  <thead>
                    <tr>
                      <th>File name</th>
                      <th>Status</th>
                      <th>Comment</th>
                      <th>Date</th>
                      <th>User</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='flex gap-2 items-center'>
                        <FontAwesomeIcon icon={faFilePdf} className='w-8 text-red-500'/>
                        INV 2025-SI-0035
                      </td>
                      <td>
                        <button>Pending</button>
                      </td>
                      <td>
                        <p>Invoice not yet returned</p>
                      </td>
                      <td>
                        2025-01-28
                      </td>
                      <td>Victor Isaac</td>
                    </tr>
                    <tr>
                      <td className='flex gap-2 items-center'>
                        <FontAwesomeIcon icon={faFilePdf} className='w-8 text-red-500'/>
                        INV 2025-SI-0035
                      </td>
                      <td>
                        <button>Pending</button>
                      </td>
                      <td>
                        <p>Invoice not yet returned</p>
                      </td>
                      <td>
                        2025-01-28
                      </td>
                      <td>Victor Isaac</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>

    </div>
  )
}

export default page
