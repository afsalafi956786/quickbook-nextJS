import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import { useState,useContext,useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { userSignup } from '@/config/userEndpoints';
import { useRouter } from 'next/router';



const theme = createTheme();

export default function Otp() {

  const router=useRouter();
  const [otp,SetOtp]=useState('')
  const {userDetails,setUserDetails} = useContext(AuthContext)


  // useEffect(()=>{
  //   // function created for do await 
  //       async function invoke(){
  //       if(localStorage.getItem('usertoken')){
  //         const data = await userDatafetch({'usertoken':localStorage.getItem('usertoken')})
  //         if(data.status=='failed'){
  //           router.push('/auth/signup')
  //         }else if(data.auth){
  //           router.push('/')
  //         }
  //       }else{
  //         router.push('/auth/signup')
  //       }
  //       }
  //       invoke();
      
              
  
  //     },[])

  const VerifyOtp = async (e) => {
    e.preventDefault();
   
    console.log(userDetails)
 
      try{
        await userDetails.otpVerify.confirm(otp)
        const data= await userSignup(userDetails)
        if(data.status=='success'){
          localStorage.setItem('usertoken',data.token)
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

            router.push('/')


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
      }catch(error){
        console.log(error)
      }

    
  
    // const data = new FormData(event.currentTarget);
    // localStorage.setItem('usertoken',data.token);  
    

  };

  return (
    <ThemeProvider theme={theme}>
    <ToastContainer />
      <Container sx={{ paddingBottom:'4%' }} component="main" maxWidth="sm">
        <CssBaseline />
        <Box xs={12}
          sx={{
            marginTop:8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingRight:3,
            paddingLeft:3,
            boxShadow:4,
            borderColor:'grey.500',
            borderRadius:0,
            position:'relative',
          }}
        >   <Grid container sx={{justifyContent:'center',px:8}}>
        <Grid sx={{align:'center'}}>
            <img src='/logo/otp.png'/>
            <Typography component="h1" variant="h5"  sx={{fontStyle:'-moz-initial',color:'GrayText',textAlign:'center'}}>
            Otp verification
          </Typography>
        </Grid>
          
          </Grid>
          <Box component="form" noValidate onSubmit={VerifyOtp} sx={{ mt: 3,px:8 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="otp"
                  onChange={(e)=>SetOtp(e.target.value)}
                  label="Otp"
                  name="otp"
                  autoComplete=""
                />
              </Grid>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 6, mb: 2 ,mx:6, backgroundColor:'#1976d2 !important' }}
            >
              Sign Up
            </Button>
            
             <Grid item xs={12} sx={{ display:'flex' }}>
                <Grid item xs={6} sx={{ mr:2,mx:2,mb:3 }}>
                <hr/>
                </Grid>
                <Grid item xs={6} sx={{ ml:2,mx:3 }}>
                <hr/>     
                </Grid>
            </Grid>

            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}