import React from 'react'

//css 
import '../css/sidebar.css'

//images
import soar_logo from '../images/soar.png';

const Sidebar = () => {
    return (
        <div>
        <nav id="sidebar">
          <div className="sidebar-header">
            <img
              className="soar_logo"
              src={soar_logo}
              alt="logo"
            />
          </div>
          <ul className="list-unstyled components navLinks">
            <li id='dashact'>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a id='convoact' href="/convos">Convos</a>
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
