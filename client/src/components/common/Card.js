import React from 'react'
import { Link } from 'react-router-dom';

const Card = ({file}) => {
  const {originalFileName, fileSize, totalWordCount, uniqueWordCount, createdAt, fileId} = file;
  return (
    <Link to={fileId + "/file"} className='flex w-7/12 text-lg justify-between bg-[#dfe6e9] p-6 m-2 rounded-lg shadow-lg hover:bg-opacity-50 transition duration-100 ease-in-out'>
      <h2 className='flex-1 font-bold'>{originalFileName}</h2>
      <h4 className='flex-1'>Total Word Count: {totalWordCount}</h4>
      <h4 className='flex-1'>Unique Word Count: {uniqueWordCount}</h4>
      <h4 className='flex-1'>File Size: {fileSize} kb</h4>
    </Link>

  )
}

export default Card