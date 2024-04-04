import React from 'react'

const Header = () => {
  return (
    <div className='flex w-full justify-between p-3 bg-blue-300 text-2xl font-mono items-center shadow-md'>
      <h1 className='pl-10'>File Insights: Count, Uniqueness, Synonyms</h1>
      <img className='h-10 pr-10 cursor-pointer' alt='img' src='https://www.svgrepo.com/show/31480/notification-bell.svg' />
    </div>
  )
}

export default Header