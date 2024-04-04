import React from 'react'

const Upload = () => {
  return (
    <div className='flex w-full justify-center'>
      <div className='flex flex-col items-center justify-center w-8/12 bg-gray-200 mt-16 p-8 border-2 border-black-300 rounded-2xl shadow-lg'>
          <img 
            className='h-32 cursor-pointer bg-gray-300 rounded-3xl shadow-lg opacity-50 hover:opacity-100 transition duration-300 ease-in-out' 
            alt='upload-img' src='https://upload.wikimedia.org/wikipedia/commons/2/27/Noun_Project_cloud_upload_icon_411593_cc.svg' 
          />
          <button className='mt-8 p-2 px-4 text-lg  bg-blue-200 rounded-lg hover:bg-blue-300 transition duration-75 ease-in-out'>
            Upload files
          </button>
      </div>
    </div>
  )
}

export default Upload