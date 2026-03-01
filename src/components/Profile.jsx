import React from 'react'
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((store) => store.user);
  console.log("User from Redux:", user);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Please login first</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">User Profile</h2>
          
          <div className="mt-4">
            <p><strong>First Name:</strong> {user.firstName || "N/A"}</p>
            <p><strong>Last Name:</strong> {user.lastName || "N/A"}</p>
            <p><strong>Email:</strong> {user.emailId || user.email || "N/A"}</p>
            <p><strong>Age:</strong> {user.age || "N/A"}</p>
            <p><strong>Gender:</strong> {user.gender || "N/A"}</p>
            <p><strong>About:</strong> {user.about || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Profile;
