
'use client'
import { useState } from 'react';

export default function MissingInvoices() {
  const [files, setFiles] = useState([]);
  const [startNumber, setStartNumber] = useState('');
  const [endNumber, setEndNumber] = useState('');
  const [missingInvoices, setMissingInvoices] = useState([]);

  const handleDirectorySelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
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

  return (
    <div className="p-4">
      <h1 className="text-4xl text-center font-bold mb-4 text-white">MISSING INVOICES CHECKER</h1>

      <div className="mb-4">
        <label className=" mb-2 font-medium">Select Directory</label>
        <input
          type="file"
          webkitdirectory="true"
          directory="true"
          multiple
          onChange={handleDirectorySelect}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Start Invoice Number</label>
        <input
          type="number"
          value={startNumber}
          onChange={(e) => setStartNumber(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">End Invoice Number</label>
        <input
          type="number"
          value={endNumber}
          onChange={(e) => setEndNumber(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <button
        onClick={handleCheckInvoices}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Check Missing Invoices
      </button>

      {missingInvoices.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-medium">Missing Invoices</h2>
          <ul className="list-disc pl-4">
            {missingInvoices.map((num) => (
              <li key={num}>Invoice Number: {num.toString().padStart(4, '0')}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
