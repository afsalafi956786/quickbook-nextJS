import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useState,useContext } from "react";
import {  RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";
import { AuthContext } from "@/context/AuthContext";
import { vendorSignup,vendorSignupOtp } from "@/config/venderEndpoints";
import { auth } from "@/config/firebase/firebase";


const theme = createTheme();

export default function VendorSignup() {
  const router = useRouter();

  const [name, setName] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [email, setEmail] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [password, setPassword] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [confirmPass, setConfirmPass] = useState(false);
  const [confirmPassErr, setConfirmPassErr] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [mobileErr, setMobileErr] = useState(false);
  const [changeButton,setChangeButoon]=useState(false)
  const [takeNumber,setTakeNumber]=useState('')

  const {vendorDetails,setVendorDetails}=useContext(AuthContext)
  const {vendorOtp,setVendorOtp}=useContext(AuthContext)


  function setUpRecapcha(mobile){
    try{
      
      const recaptchaVerifier=new RecaptchaVerifier('recaptcha-containerdiv',{},auth);
      recaptchaVerifier.render();
      return signInWithPhoneNumber(auth,mobile,recaptchaVerifier)
    }catch(error){
      console.log(error.message)
    }
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let obj = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPass: data.get("confirmPass"),
      propertyName: data.get("propertyname"),
      propertyLocation: data.get("propertylocation"),
      phone: data.get("mobile"),
      otpChecking:vendorOtp
    };

   

    if (
      obj.name &&
      obj.password &&
      obj.confirmPass &&
      obj.email &&
      obj.propertyName &&
      obj.propertyLocation &&
      obj.phone
    ) {
      let regName = /^[a-zA-Z]+$/;
      let regEmail =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      let regMob = /^([+]\d{2})?\d{10}$/;
      if (regName.test(obj.name)) {
        console.log("ullil vannu");
        setNameErr("");
        setName(false);
        if (regEmail.test(obj.email)) {
          setEmail(false);
          setEmailErr("");
          if (obj.password === obj.confirmPass) {
            setPassword(false);
            setConfirmPass(false);
            setPassErr("");
            setConfirmPassErr("");
            if (regMob.test(obj.phone)) {
              setMobile(false);
              setMobileErr("");
              const data=await vendorSignupOtp(obj)
              console.log(data)
              if(data.status=='success'){
              

                setVendorDetails(obj);

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
            
                  router.push('/vendor/otp') 

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

            } else {
              setMobile(true);
              setMobileErr("Enter a valid phone number");
            }
          } else {
            setPassword(true);
            setConfirmPass(true);
            setPassErr("password and confirm password is not same");
            setConfirmPassErr("password and confirm password is not same");
          }
        } else {
          setEmail(true);
          setEmailErr("Please enter a valid email");
        }
      } else {
        setName(true);
        setNameErr("Please enter invalid name");
      }
    } else {
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
      <Container sx={{ paddingBottom: "4%" }} component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          xs={12}
          sx={{
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingLeft: 4,
            paddingRight: 4,
            paddingTop: 6,
            boxShadow: 4,
            borderColor: "grey.500",
            borderRadius: 0,
            position: "relative",
          }}
        >
          {" "}
          <Grid container>
            <Typography
              component="h1"
              variant="h5"
              align="left"
              sx={{
                fontStyle: "-moz-initial",
                color: "GrayText",
                fontWeight: "bold",
              }}
            >
              Vendor Register
            </Typography>
          </Grid>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
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
                  type="password"
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
                  type="password"
                  name="confirmPass"
                  error={confirmPass}
                  helperText={confirmPassErr}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="propertyname"
                  type='text'
                  required
                  fullWidth
                  id="propertyname"
                  label="Property Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="propertylocation"
                  label="Property Location"
                  type='text'
                  name="propertylocation"
                  autoComplete="proptertylocaiton"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile Number"
                  name="mobile"
                  onChange={(e)=>setTakeNumber(e.target.value)}
                
                  error={mobile}
                  helperText={mobileErr}
                  autoComplete="mobile number"
                />
              </Grid>
        

              <div className="mt-4 ml-4" id="recaptcha-containerdiv"/>
      
        { ! changeButton ? (<Button
                fullWidth
                variant="contained"
                onClick={()=>{
                  try{
                  let regMobile=/^([+]\d{2})?\d{10}$/;
                  console.log(takeNumber)
                 if(regMobile.test(takeNumber) || takeNumber !==''){
                  setUpRecapcha("+91"+takeNumber).then((res)=>{
                    setVendorOtp(res)
                    setChangeButoon(true)
                  }).catch((error)=>{
                    console.log(error.message)
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
                  console.log(error.message)
                }
                }}
                sx={{
                  mt: 3,
                  mb: 2,
                  mx: 3,
                  backgroundColor: "#1976d2 !important",
                }}
              >
                Verify
              </Button>
        ):(   
          <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  mx: 3,
                  backgroundColor: "#1976d2 !important",
                }}
              >
               Get OTP 
              </Button>
        )
              }
              <Grid container justifyContent="flex-start ">
                <Grid>
                  <Box
                    variant="body2"
                    sx={{
                      textDecoration: 0,
                      color: "black",
                      mx: 3,
                      color: "gray",
                    }}
                  >
                    Already have an account ?
                    <Link href="/vendor/login" style={{ color: "#1976d2" }}>
                      {" "}
                      Click here
                    </Link>
                  </Box>
                </Grid>
              </Grid>

              <Grid item xs={12} sx={{ display: "flex" }}>
                <Grid item xs={6} sx={{ mr: 2, mx: 2, mb: 3 }}>
                  <hr />
                </Grid>
                <Grid item xs={6} sx={{ ml: 2, mx: 3 }}>
                  <hr />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
