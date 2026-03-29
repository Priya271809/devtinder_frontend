import React from 'react'
import { useState } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants.js';

const Login = () => {
  const [emailId, setEmailId] = useState("vishalverma27@gmail.com");
  const [password, setPassword] = useState("Vishal@123");
  const [loginData, setLoginData] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    
    e.preventDefault();
    setError(null);
    setLoginData(null);
   try {
    const res = await axios.post(`${BASE_URL}/login`, {
      emailId,
      password
    }, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true 
    });
    console.log("BASE_URL:", BASE_URL);

    if (res.data) {
      setLoginData(res.data);
      dispatch(addUser(res.data));
      navigate("/");
    } else {
      setError("No data received from server");
    }
  }
    catch (err) {
      console.log("Error:", err.response?.data || err.message);
      setError(err.response?.data || err.message);
    }
  }
  return (
    <div className='flex justify-center my-10'>
     <div className="card bg-base-300 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title justify-center">Login!</h2>
    <div>
<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Email Id</span>
    
  </div>
  <input type="text"  
  value = {emailId}
  className="input input-bordered w-full max-w-xs"
  onChange={(e) => {
  setEmailId(e.target.value)
  }}
   />
  
</label>
<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Password</span>
    
  </div>
<input type="text" 
  value = {password}
   className="input input-bordered w-full max-w-xs"
   onChange={(e) => {
  setPassword(e.target.value)
  }}
   />
  
</label>
    </div>
    <div className="card-actions justify-center m-2">
      <button className="btn btn-primary" 
      onClick={handleLogin}>Login</button>
    </div>
    
    {/* Display login response */}
    {loginData && (
      <div className="alert alert-success mt-4">
        <span>Login Successful!</span>
      </div>
    )}
    
    {/* Display error message */}
    {error && (
      <div className="alert alert-error mt-4">
        <span>{error}</span>
      </div>
    )}
  </div>
</div>
    </div>
  )
};

export default Login;
