import '@/styles/globals.css'
import { AuthContext } from '@/context/AuthContext'
import { useState } from 'react'



export default function App({ Component, pageProps }) {
  const [userDetails,setUserDetails]=useState({})
  const [otpconfirm,otpSetConfirm]=useState({})

  return(

  
  <>
  <AuthContext.Provider value={{userDetails,setUserDetails,otpconfirm,otpSetConfirm}} >
   <Component {...pageProps} />
  </AuthContext.Provider>
  </>
  )
}
