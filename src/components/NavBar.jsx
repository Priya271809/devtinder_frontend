import React from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';

const NavBar = () => {
const user = useSelector((store) => store.user);
const dispatch = useDispatch();
const navigate = useNavigate();

const handleLogout = async() => {
  navigate("/login", {replace: true});
  dispatch(removeUser());
  try {
    await axios.post(`${BASE_URL}/handleLogout`, {}, {withCredentials: true});
  }
  catch( err ) {
    console.log('Logout API error:', err.message);
  }
}

 return(
  <div className="navbar bg-base-300">
  <div className="flex-1">
    <Link to = "/" className="btn btn-ghost text-xl">DevTinder</Link>
  </div>
  {user && (
  <div className="flex-none gap-2">
<div className='text-lg font-semibold'>Welcome, {user?.name}</div>
   
    <div className="dropdown dropdown-end mx-5 flex ">
     
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg shadow-lg border-2 border-white">
            {user?.emailId ? user.emailId[0].toUpperCase() : '?'}
          </div>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
        <Link to = "/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
<li><Link to="/settings">Settings</Link></li>
        <li>
          <a onClick={handleLogout}>Logout</a>
          </li>
      </ul>
    </div>

  </div>
  )}
</div>
 );
};

export default NavBar;
