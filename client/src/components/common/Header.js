import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client';
import { useNotification } from '../../utils/useNotification';
import { useQueryClient } from 'react-query';
import { notification } from 'antd';
const socket = io("http://localhost:4001");

const Header = () => {

  const {notificationCount, incrementNotificationCount, clearNotificationCount} = useNotification();
  const queryClient = new useQueryClient();
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to client");
    })

    socket.on("file processing done", () => {
      console.log("file processing finished")
      incrementNotificationCount();
      queryClient.invalidateQueries("files")
      api.info({
        message: "File Processing completed"
      })
    })

    socket.on('error', (data) => {
      console.log(data)
      let [message, description] = data.split(".")
      api.error({
        message,
        description
      })
    })
    
    return () => {
      socket.disconnect();
    }
  }, [])
  return (
    <div className='flex w-full justify-between p-3 bg-blue-300 text-2xl font-mono items-center shadow-md'>
      {contextHolder}
      <Link to="/"><h1 className='pl-5'>File Insights: Count, Uniqueness, Synonyms</h1></Link>
      <div className='relative'>
        <Link><img className='h-10 pr-10 cursor-pointer' alt='img' src='https://www.svgrepo.com/show/31480/notification-bell.svg'/></Link>
        <div className='absolute flex justify-center items-center w-7 h-7 rounded-full top-0 left-5 bg-red-500  border-2 border-white'>
          <p className='text-[1.2rem] text-white font-serif'>{notificationCount}</p>
        </div>
      </div>
    </div>
  )
}

export default Header