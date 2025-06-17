import React from "react";
import {Paper,TextField,Typography,Button,} from "@mui/material"
import { useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import Register from "./Register";
import {BrowserRouter as Router,Routes,Route,useNavigate, Link} from "react-router-dom"



let countRender=0
const Login = () => {

  let navigate =useNavigate()
  let paperStyle={
    width:400,
    display:"grid",
    gap:"20px",
    marginLeft:"10%",
    // marginRight:"50%",

  }
 

  let formInputData=(data)=>{
    console.log(data);
    
  }
 let schema= yup.object().shape({
  
  username:yup.string().required("Enter Your userName").min(5,"enter between 5 to 10 some characters").max(10,"enter between 5 to 10 some chatacters"),
  password:yup.string().required("Enter Your password").min(5,"enter between 5 to 10 some characters").max(10,"enter between 5 to 10 some chatacters")
})
let {register,handleSubmit,formState:{errors}}= useForm({
   resolver:yupResolver(schema)
  })
  countRender++
  
  return(
      <div className="holeLogin">
      <Paper component="form" elevation={20} style={paperStyle} onSubmit={handleSubmit(formInputData)}>
           <Typography variant="h5" textAlign="center">Login-{countRender}</Typography>
          <TextField label="UserName"{...register("username")} error={!!errors.username} helperText={errors.username?.message}/>
          <TextField label="Password" {...register("password") } error={!!errors.password} helperText={errors.password?.message}/>
          <Button variant="contained" type="submit">Submit</Button>
          <div style={{display:"flex",gap:"10px",marginBottom:"1%"}}>

          <span>if don't have a account pls😯,</span>
          <Link to="/register" style={{textDecoration:"none",marginBottom:"1%"}}>Click Me!</Link>
          </div>
      </Paper>
     
      
      </div>
        );
};

export default Login;
