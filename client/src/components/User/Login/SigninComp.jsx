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
import 'react-toastify/dist/ReactToastify.css';
import { useState,useEffect } from 'react';
import { userSignin,userDatafetch } from '@/config/userEndpoints';
import { useRouter } from 'next/router';


const theme = createTheme();

export default function Signin() {
  const router=useRouter()
   const [email,setEmail]=useState(false)
   const [emailErr,setEmailErr]=useState(false)
   
 
   useEffect(()=>{
    async function invokeForAwait(){
        if(localStorage.getItem('usertoken')){
    const data=await userDatafetch({'usertoken':localStorage.getItem('usertoken')})
    if(data.status=='failed'){
      router.push('/auth')
    }else if(data.auth){
      router.push('/')
    }
  }else{
    router.push('/auth')
  }
    }
    invokeForAwait()

    

   },[])


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    let obj={
      email:data.get('email'),
      password:data.get('password')
    }
    
    
    if(obj.email && obj.password){
      let logEmail=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(logEmail.test(obj.email)){
        setEmail(false);
        setEmailErr("")
        const data=await userSignin(obj)
        console.log(data)
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
        

      }else{
        setEmail(true);
        setEmailErr('please enter a valid email address')
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
      <Container sx={{ paddingBottom:'4%' }} component="main" maxWidth="sm">
        <CssBaseline />
        <Box xs={12}
          sx={{
            marginTop:12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingLeft:4,
            paddingRight:4,
            paddingTop:6,
            boxShadow:4,
            borderColor:'grey.500',
            borderRadius:0,
            position:'relative',
          }}
        >   <Grid container>
          <Typography component="h1" variant="h5" align='left' sx={{fontStyle:'-moz-initial',color:'GrayText'}}>
            Signin your Account
          </Typography>
          </Grid>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
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

              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="password"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  autoFocus
                />
              </Grid>
    

              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,mx:3, backgroundColor:'#1976d2 !important' }}
            >
              Sign in
            </Button>
            <Grid container justifyContent="flex-start ">
              <Grid>
                <Box variant="body2" sx={{textDecoration:0,color:'black',mx:3,color:'gray'}}>
                  Already have an account?
                   <Link href='/auth/signup' style={{color:'#1976d2'}}> Click here</Link>
                </Box>
              </Grid>
            </Grid>
            
             <Grid item xs={12} sx={{ display:'flex' }}>
                <Grid item xs={6} sx={{ mr:2,mx:2,mb:3 }}>
                <hr/>
                </Grid>
                <Grid item xs={6} sx={{ ml:2,mx:3 }}>
                <hr/>     
                </Grid>
            </Grid> 
            <Grid container justifyContent="flex-end ">
            <Grid item sx={{display:'flex'}}>
                <Box sx={{mr:1 , fontSize:'17px',fontStyle:'-moz-initial',color:'Gray'}}>
                    <h3> Do you have a propery?</h3>
                </Box>
                <Link href="#" variant="body2" sx={{mt: 0.1 ,textDecoration:0,color:'black',color:'#1976d2',fontFamily:'-moz-initial',fontSize:'17px'}}>
                  <p style={{fontFamily:'-moz-initial'}}>Click here</p> 
                </Link>
              </Grid>
              </Grid>

            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
