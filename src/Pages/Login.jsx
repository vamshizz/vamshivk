import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthProvider';
 





const Login = () => {
  
  const {login,logout}=useContext(AuthContext)
  
  const [loginDetails,setloginDetails]=useState({
    patientEmailId:"",
    patientPassword:""
  })
  const handleChange = (e) => {
  

    const { name, value } = e.target;
    setloginDetails(prevLoginDetails => ({
      ...prevLoginDetails,
      [name]: value
    }));
  };
  const handleLogin = async(e) => {
    
    e.preventDefault();
    try {
      const res=await fetch("http://localhost:4000/login",{
        method:"POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify(loginDetails)
       })
       const json= await res.json();
       console.log(json);
        if(!res.ok){
           console.log(json);
        }
        if(res.ok){
            console.log(json);
            login(json.user,json.token);
        }
        setloginDetails({
         
          patientEmailId: "",
          patientPassword: ""
        });
  
    } 
    catch(error){
      console.log(error);
    }
   
  };
  function handlogout(){
    logout();
  }
 
  return (
    <div>
        <form onSubmit={handleLogin}>
          <label>Email:</label>
        <input
          type='email'
          name="patientEmailId"
          value={loginDetails.patientEmailId}
          onChange={handleChange}
        /><br/><br/>
        <label>Password:</label>
        <input
          type='password'
          name="patientPassword"
          value={loginDetails.patientPassword}
          onChange={handleChange}
        /><br/>
      <button type='submit'>Login</button><br/>
      <button onClick={handlogout}>logout</button>
        </form>
    </div>
  )
}

export default Login