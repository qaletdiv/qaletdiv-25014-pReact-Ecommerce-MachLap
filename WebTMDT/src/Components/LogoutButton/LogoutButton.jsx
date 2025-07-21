import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/Slices/authSlice';



const LogoutButton = () => {
  const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        window.location.href = "/login";
    }
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default LogoutButton
