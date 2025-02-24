'use client'
import React, { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  height: '200px',
  width: '400px'
};

const focusedStyle = { borderColor: '#2196f3' };
const acceptStyle = { borderColor: '#00e676' };
const rejectStyle = { borderColor: '#ff1744' };

function Dropzone({handleDirectoryChange, files, setFiles}) {
    
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragActive, // Use this instead of isDragReject to avoid false rejections
    acceptedFiles
  } = useDropzone({
    noClick: false, // Allow clicking to select files
    noKeyboard: false, // Allow keyboard interactions
    multiple: true, // Allow multiple files
    onDrop: (files) => {
      // Filter out only PDF files
      const pdfFiles = files.filter(file => file.type === "application/pdf");
      
    }
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragActive ? acceptStyle : {}) // Show active style when dragging
  }), [isFocused, isDragActive]);

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} multiple onChange={handleDirectoryChange}/>
        <svg height="1em" viewBox="0 0 640 512">
          <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"/>
        </svg>
        <p>Drag 'n' drop a folder of PDFs here, or click to select files</p>
      </div>
    </div>
  );
}

export default Dropzone;
