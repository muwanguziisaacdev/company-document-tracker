'use client'
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

export default function MissingInvoices() {
  const [files, setFiles] = useState([]);
  const [startNumber, setStartNumber] = useState('');
  const [endNumber, setEndNumber] = useState('');
  const [missingInvoices, setMissingInvoices] = useState([]);
  const [status, setStatus] = useState('Not Started');
  const [comment, setComment] = useState('');

  const id = uuid();

  const handleDirectorySelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleCommentChange = (num, value) => {
    setComment((prev) => ({
      ...prev, 
      [num]: value,
    }));
  };

  const handleStatusChange = (num, newStatus) => {
    setStatus((prev) => ({
      ...prev,
      [num]: newStatus,
    }));
    console.log(status);
  };

  const handleCheckInvoices = async () => {
    if (!files.length || !startNumber || !endNumber) {
      alert('Please select a directory and fill in all fields.');
      return;
    }

    try {
      const response = await fetch('/api/check-missing-invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          files: files.map((file) => file.name),
          startNumber: parseInt(startNumber, 10),
          endNumber: parseInt(endNumber, 10),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMissingInvoices(data.missingInvoices);
      } else {
        alert(data.error || 'Something went wrong.');
      }
    } catch (error) {
      alert('Failed to check invoices.');
    }
  };

  const handleDownloadCSV = () => {
    if (missingInvoices.length === 0) {
      alert('No missing invoices to download.');
      return;
    }

    const csvContent = [
      ['File Name', 'Number', 'Status', 'Comment'], // Header row
      ...missingInvoices.map((num) => [
        'INVOICE',
        num.toString().padStart(4, '0'),
        status[num] || 'Not Started',
        comment[num] || '',
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'missing_invoices.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl text-center font-bold mb-4 text-white">MISSING INVOICES CHECKER</h1>
      <div className="flex justify-center mt-28">
        <div className="container border-2 border-dashed border-gray-600 w-3/6 m-auto flex justify-center flex-col items-center">
          <div className="header">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <p>Browse Folder</p>
          </div>
          <label htmlFor="file" className="footer flex justify-evenly gap-4 items-center mt-5 font-medium">
            <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.331 6H8.5v20h15V14.154h-8.169z"></path>
              <path d="M18.153 6h-.009v5.342H23.5v-.002z"></path>
            </svg>
            <p>Not selected file</p>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z" stroke="#000000" strokeWidth="2"></path>
              <path d="M19.5 5H4.5" stroke="#000000" strokeWidth="2" strokeLinecap="round"></path>
              <path d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z" stroke="#000000" strokeWidth="2"></path>
            </svg>
          </label>
          <input
            className="hidden"
            id="file"
            type="file"
            webkitdirectory="true"
            directory="true"
            multiple
            onChange={handleDirectorySelect}
          />
        </div>
      </div>

      <div className="flex justify-evenly items-center mt-10">
        <div className="inputs range-number">
          <label className="">Start Invoice Number</label>
          <input
            type="number"
            value={startNumber}
            onChange={(e) => setStartNumber(e.target.value)}
            placeholder="1"
            className=""
          />
        </div>

        <div className="inputs range-number">
          <label className="">End Invoice Number</label>
          <input
            type="number"
            value={endNumber}
            onChange={(e) => setEndNumber(e.target.value)}
            placeholder="100"
            className=""
          />
        </div>
      </div>

      <div className="w-full flex justify-center">
        <button
          onClick={handleCheckInvoices}
          className="thmb thmb-2 bg-blue-500 text-white px-6 py-4 rounded mt-10 font-medium"
        >
          CHECK INVOICES
        </button>
      </div>

      {missingInvoices.length > 0 && (
        <div className="mt-4">
          <div className="flex justify-center">
            <table className="missing-table">
              <caption className="text-2xl font-medium mb-5">MISSING INVOICES</caption>
              <thead className="">
                <tr>
                  <th>File name</th>
                  <th>Number</th>
                  <th>Status</th>
                  <th>Comment</th>
                </tr>
              </thead>

              <tbody>
                {missingInvoices.map((num) => {
                  const unique_id = uuid();

                  return (
                    <tr key={unique_id}>
                      <td>
                        <FontAwesomeIcon icon={faFilePdf} className="w-7 text-red-400 font-medium" />
                        INVOICE
                      </td>
                      <td>{num.toString().padStart(4, '0')}</td>
                      <td>
                        <select
                          name="status"
                          id="status"
                          value={status}
                          onChange={(e) => handleStatusChange(unique_id, e.target.value)}
                        >
                          <option value="not-started">Not Started</option>
                          <option value="pending">Pending</option>
                          <option value="success">Success</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="credited">Credited</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          value={comment[num] || ''}
                          onChange={(e) => handleCommentChange(num, e.target.value)}
                          placeholder="Comment here"
                          className="p-4 w-[500px] bg-transparent outline-none"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleDownloadCSV}
              className="bg-green-500 text-white px-6 py-4 rounded font-medium"
            >
              DOWNLOAD CSV
            </button>
          </div>
        </div>
      )}
    </div>
  );
}