import React from 'react'
import './MyStyles.css';
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom';

const MainContainer = () => {
  return (
    <div class="main-container">
        <SideBar />
        <Outlet />
    </div>
  )
}

export default MainContainer