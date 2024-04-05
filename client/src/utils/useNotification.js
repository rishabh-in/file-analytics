import React, { useContext, useState } from "react";

const NotificationContext = React.createContext();

export const NotificationProvider = ({children}) => {
  const [notificationCount, setNotificationCount] = useState(0);

  const incrementNotificationCount = () => {
    setNotificationCount(prevCount => prevCount + 1)
  }

  const clearNotificationCount = () => {
    setNotificationCount(prevCount => prevCount * 0);
  }

  return (
    <NotificationContext.Provider value={{
      notificationCount,
      incrementNotificationCount,
      clearNotificationCount
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

//custom hook
export const useNotification = () => useContext(NotificationContext);