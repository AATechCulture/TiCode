import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import $ from "jquery";

import '../css/sidebar.css';
import '../css/variables.css';
import soar_logo from '../images/soar.png';

const Sidebar = () => {
  const location = useLocation();
  //var contain  = $(".dashboard_container")

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    // if(isSidebarOpen){
    //     $('.dashboard_container').css('margin-left', '280px');
    //     $('.soar').css('transform', 'scale(1)');


    // }else{
    //     $('.dashboard_container').css('margin-left', '0px');
    //     $('.soar').css('transform', 'scale(0.8)');

    // }
  };

  return (
    <div>
      <button className='toggle_btn' onClick={toggleSidebar}>Toggle Sidebar</button>
      <nav id="sidebar" className={isSidebarOpen ? 'active' : ''}>
        <div className="sidebar-header">
          <img
            className="soar_logo"
            src={soar_logo}
            alt="logo"
          />
        </div>
        <ul className="list-unstyled components navLinks">
          <li id='dashact'>
            <a href="/Dashboard" className={location.pathname === '/Dashboard' ? 'active' : ''}>Dashboard</a>
          </li>
          <li>
            <a href="/Conversations" className={location.pathname === '/Conversations' ? 'active' : ''}>Conversations</a>
          </li>
          <li>
            <a href="/Profile" className={location.pathname === '/Profile' ? 'active' : ''}>Profile</a>
          </li>
          <li>
            <a href="#">Logout</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
