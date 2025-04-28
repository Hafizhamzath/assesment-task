import React, { useState } from 'react';
import { Collapse, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaNewspaper, FaPen, FaBriefcase, FaMapMarkedAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; 
import '../styles/sidebar.css';  

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => setIsCollapsed(!isCollapsed);

  return (
    <div className={`sidebar-container ${isCollapsed ? 'collapsed' : ''}`}>
      <Navbar bg="dark" expand="lg" className="sidebar">
        {/* Brand */}
        <Navbar.Brand href="#home" className={`sidebar-brand ${isCollapsed ? 'collapsed' : ''}`}>
          {!isCollapsed && 'Freeshopps Admin'}
        </Navbar.Brand>


        {/* Navigation */}
        <Collapse in={!isCollapsed}>
          <Nav className="flex-column sidebar-nav">
            <Nav.Link as={Link} to="/" className="sidebar-item">
              <FaTachometerAlt className="sidebar-icon" /> {!isCollapsed && 'Dashboard'}
            </Nav.Link>
            <Nav.Link as={Link} to="/articles" className="sidebar-item">
              <FaNewspaper className="sidebar-icon" /> {!isCollapsed && 'Articles'}
            </Nav.Link>
            <Nav.Link as={Link} to="/blogs" className="sidebar-item">
              <FaPen className="sidebar-icon" /> {!isCollapsed && 'Blogs'}
            </Nav.Link>
            <Nav.Link as={Link} to="/careers" className="sidebar-item">
              <FaBriefcase className="sidebar-icon" /> {!isCollapsed && 'Careers'}
            </Nav.Link>
            <Nav.Link as={Link} to="/city-state-country" className="sidebar-item">
              <FaMapMarkedAlt className="sidebar-icon" /> {!isCollapsed && 'Country, State, City'}
            </Nav.Link>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Sidebar;
