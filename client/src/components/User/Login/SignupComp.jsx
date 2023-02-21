import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import { useState,useEffect,useContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { userSignup,userDatafetch,userSignupOtp } from '@/config/userEndpoints';
import { useRouter } from 'next/router';
import {  RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";
import { AuthContext } from '@/context/AuthContext';
import {auth} from '@/config/firebase/firebase'


const theme = createTheme();


export default function SignUp() {
    const router = useRouter()
    const[name,setName]=useState(false);
    const [nameErr,setnameErr]=useState(false);
    const [email,setEmail]=useState(false);
    const [emailErr,setEmailErr]=useState(false);
    const [password,setPassword]=useState(false);
    const [passErr,setPassErr]=useState(false);
    const [confirmPass,setConfirmPass]=useState(false);
    const [confirmPassErr,setConfirmPassErr]=useState(false)
    const [mobile,setMobile]=useState(false)
    const [mobileErr,setMobileErr]=useState(false)
    const [change,setChange]=useState(false)
    const [getMobile,SetGetMobile]=useState('')


   const { otpconfirm,otpSetConfirm }=useContext(AuthContext)
   const {userDetails,setUserDetails}=useContext(AuthContext)
   
  
   

   

    useEffect(()=>{
  // function created for do await 
      async function invoke(){
      if(localStorage.getItem('usertoken')){
        const data = await userDatafetch({'usertoken':localStorage.getItem('usertoken')})
        if(data.status=='failed'){
          router.push('/auth/signup')
        }else if(data.auth){
          router.push('/')
        }
      }else{
        router.push('/auth/signup')
      }
      }
      invoke();
    
            

    },[])
  
    function setUpRecapcha(mobile){
      console.log('function ullil keri')
      try{
         const recaptchaVerifier=new RecaptchaVerifier('recaptcha-container', {}, auth);
      recaptchaVerifier.render();
      return signInWithPhoneNumber(auth,mobile,recaptchaVerifier);
      }catch(error){
        console.log(error.message);
      }
     
    }




  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    //input datas
    let obj={
        name:data.get('name'),
        email:data.get('email'),
        password:data.get('password'),
        confirmPass:data.get('confirmPass'),
        mobile:data.get('mobile'),
        otpVerify:otpconfirm

    }
    console.log(obj +'sssss');
    if(obj.name && obj.email && obj.password && obj.confirmPass && obj.mobile){
        let regName=/^[a-zA-Z]+$/;
        let regEmail=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let regMob=/^([+]\d{2})?\d{10}$/;
        if(regName.test(obj.name)){
            setName(false);
            setnameErr("")
        if(regEmail.test(obj.email)){
            setEmail(false);
            setEmailErr("")
        if(obj.password === obj.confirmPass){
            setPassword(false);
            setConfirmPass(false);
            setPassErr("")
            setConfirmPass("")
        if(regMob.test(obj.mobile)){
            setMobile(false)
            setMobileErr("")
            const data=await  userSignupOtp(obj)
            console.log(data);
             if(data.status=='success'){
              setUserDetails(obj)
                toast.success( `Wow! ${data?.message}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    }); 
                    console.log('root ivide ann')
                    router.push('/auth/otp')  
             }else{
                toast.error(`OOPS! ${data?.message}`,{
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    })
             
             }
           
        }else{
            setMobile(true);
            setMobileErr('please enter a valid mobile number')
        }
        }else{
            setPassword(true);
            setConfirmPass(true);
            setPassErr('password and confirm password not same');
            setConfirmPassErr('password and confirm password not same');
        }
        }else{
            setEmail(true);
            setEmailErr('please enter a valid email')
        }
        }else{
            setName(true);
            setnameErr('please enter a valid name')
        }       
    }else{
        toast.error(`OOPS! All fields are required`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });

           
    }

  };

  return (
    <ThemeProvider theme={theme}>
    <ToastContainer />
    
      <Container sx={{paddingBottom:'3%'}} component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
           marginTop:8,
           marginBottom:4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingLeft:4,
            paddingRight:4,
            paddingTop:3,
            boxShadow:4,
            borderColor:'grey.500',
            borderRadius:0,
            

          }}
        >   <Grid container>
          <Typography component="h1" variant="h5" align='left' sx={{fontStyle:'-moz-initial',color:'GrayText'}}>
            Create your Account
          </Typography>
          </Grid>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  error={name}
                  helperText={nameErr}
                  autoComplete="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  error={email}
                  helperText={emailErr}
                  autoComplete="email"
                />
              </Grid>



              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="password"
                  type='password'
                  required
                  fullWidth
                  id="password"
                  error={password}
                  helperText={passErr}
                  label="Password"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="confirmPass"
                  label="Confirm Password"
                  type='password'
                  name="confirmPass"
                  error={confirmPass}
                  helperText={confirmPassErr}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile Number"
                  name="mobile"
                  onChange={(e)=>SetGetMobile(e.target.value)}
                  error={mobile}
                  helperText={mobileErr}
                  autoComplete="mobile number"
                />
              </Grid>
              <div className='mt-4 ml-4' id='recaptcha-container'/>
                {
                  !change?(
              <Button
              fullWidth
              variant="contained"
              onClick={()=>{
                try{
                  console.log('mobile kerunnu')
                  let regMob=/^([+]\d{2})?\d{10}$/;
                  if(regMob.test(getMobile) || getMobile !=''){
                     setUpRecapcha("+91"+getMobile).then((res)=>{
                    otpSetConfirm(res)
                    setChange(true)

                  }).catch((error)=>{
                    console.log(error.message);
                  })
                  }else{
                    toast.error(`OOPS! All fields are required`, {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                      });
                  }
                 
                     
                 }catch(error){
                  
    
                 }
              }}
              sx={{ mt: 3, mb: 2 ,mx:3, backgroundColor:'#1976d2 !important' }}
            >
              Verify
            </Button>
                  ):(
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 ,mx:3, backgroundColor:'#1976d2 !important' }}
                  >
                 GET OTP
                  </Button>
                  )
                }
            
            <Grid container justifyContent="flex-start ">
              <Grid>
                <Box  variant="body2" sx={{textDecoration:0,color:'black',mx:3,color:'gray'}}>
                  Already have an account? <Link href='/auth' style={{color:'#1976d2'}}> Click here</Link>
                </Box>
              </Grid>
            </Grid>
            
             <Grid item xs={12} sx={{ display:'flex' }}>
                <Grid item xs={6} sx={{ mr:2,mx:2,mb:2 }}>
                <hr/>
                </Grid>
                <Grid item xs={6} sx={{ ml:2,mx:3 }}>
                <hr/>     
                </Grid>
            </Grid> 
            <Grid container justifyContent="flex-end ">
              <Grid>
                <Box  variant="body2" sx={{textDecoration:0,color:'black',mx:3,color:'gray' }}>
                  Do you have a property? <Link href='/vendor/signup' style={{color:'#1976d2'}}> Click here</Link>
                </Box>
              </Grid>
            </Grid>

            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}