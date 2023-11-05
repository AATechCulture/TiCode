// import React from 'react';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { Link, useLocation, Outlet} from 'react-router-dom';
// // CSS
// import '../css/smallnav.css';
// // Images
// import navLogo from '../images/soar.png';

// const Smallnavigation = () => {
//   const location = useLocation();

//   return (
//     <>
//       <Navbar className="main_navbar" data-bs-theme="dark" expand="lg">
//         <Container>
//           <Navbar.Brand as={Link} to="/Dashboard">
//             <img className="nav_logo" src={navLogo} alt="SOAR LOGO" />
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbar-collapse" />
//           <Navbar.Collapse id="navbar-collapse">
//             <Nav className="me-auto nav_text">
//             <Nav.Link as={Link} to="/Dashboard" className={location.pathname === '/Dashboard' ? 'nav_text_active' : 'nav_text'}>
//                 Dashboard                                                                                            
//               </Nav.Link>
//             <Nav.Link as={Link} to="/Conversations" className={location.pathname === '/Conversations' ? 'nav_text_active' : 'nav_text'}>
//                 Converstions
//               </Nav.Link>
//               <Nav.Link as={Link} to="/Profile" className={location.pathname === '/Profile' ? 'nav_text_active' : 'nav_text'}>
//                 Profile
//               </Nav.Link>

//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//       <Outlet />
//     </>
//   );
// }

// export default Smallnavigation;
