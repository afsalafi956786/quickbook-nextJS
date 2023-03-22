import '@/styles/globals.css'
import { AuthContext } from '@/context/AuthContext'

import { useState } from 'react'
import { store } from '../store/store'
import { Provider } from 'react-redux'
import { io } from 'socket.io-client'




export default function App({ Component, pageProps }) {
  const [userDetails,setUserDetails]=useState({})
  const [otpconfirm,otpSetConfirm]=useState({})
  const[vendorDetails,setVendorDetails]=useState({})
  const [vendorOtp,setVendorOtp]=useState({})
  const [ socket, setSocket ] = useState(io('https://socket.electronicsmart.shop'))


  return(

  
  <>

  <Provider store={store}>
  <AuthContext.Provider value={{userDetails,setUserDetails,otpconfirm,otpSetConfirm,vendorDetails,setVendorDetails,vendorOtp,setVendorOtp,socket}} >
   <Component {...pageProps} />
  </AuthContext.Provider>
  </Provider>
 
  </>
  )
}
