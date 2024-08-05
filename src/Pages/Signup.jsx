import React, { useState } from 'react';

const Signup = () => {
 
  const [details, setDetails] = useState({
    PatientName: "",
    PatientAge: "",
    patientMobileNumber: "",
    patientEmailId: "",
    patientPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res=await fetch("http://localhost:4000/signup",{
        method:"POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify(details)
       })
       const json= await res.json();
        if(!res.ok){
           console.log(json);
        }
        if(res.ok){
            console.log(json);
        }
        setDetails({
          PatientName: "",
          PatientAge:"",
          patientMobileNumber:  "",
          patientEmailId: "",
          patientPassword: ""
        });

    } 
    catch(error){
      console.log(error);
    }
   
  };

  return (
    <div>
      <h1>Signup Form:</h1>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type='text'
          name="PatientName"
          value={details.PatientName}
          onChange={handleChange}
        /><br/>
        <label>Mobile Number:</label>
        <input
          type='number'
          name="patientMobileNumber"
          value={details.patientMobileNumber}
          onChange={handleChange}
        /><br/>
        <label>Age:</label>
        <input
          type='number'
          name="PatientAge"
          value={details.PatientAge}
          onChange={handleChange}
        /><br/>
        <label>Email:</label>
        <input
          type='email'
          name="patientEmailId"
          value={details.patientEmailId}
          onChange={handleChange}
        /><br/>
        <label>Password:</label>
        <input
          type='password'
          name="patientPassword"
          value={details.patientPassword}
          onChange={handleChange}
        /><br/>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
