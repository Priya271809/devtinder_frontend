import React, { useEffect } from 'react'
import NavBar from './NavBar';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Footer from './Footer';
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from "../utils/userSlice";
import axios from 'axios';
import { BASE_URL } from '../utils/constants';


const Body = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const location = useLocation();
const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true
      });
      dispatch(addUser(res.data));
    }
    catch (err) {
      console.log('Profile fetch failed:', err.response?.status || err.message);
      // Don't redirect for network/backend errors - show feed anyway
      if (err.response?.status === 401 || err.response?.status === 403) {
        // Only redirect if explicitly unauthorized
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    // Skip fetching user if on login page
    if (location.pathname === '/login') {
      return;
    }
    // Only fetch user if not already logged in
    if (!user) {
      fetchUser();
    }
  }, [location.pathname, user]);

  return (
    <div>
    <NavBar/>  
    <Outlet/>
    <Footer/>
    </div>
  );
};

export default Body;
