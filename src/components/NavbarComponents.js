import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';  

const NavbarComponents = () => {
    const navigate = useNavigate();  

    const handleLogout = () => {
        localStorage.removeItem('user');  
        navigate('/'); 
    };

    return (
        <Navbar expand="lg" variant="dark" className="navbar-custom" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
            <Navbar.Brand href="#home">
                <img 
                    src="/assets/logo.png" 
                    alt="Logo" 
                    style={{ width: '40px', height: '40px', marginRight: '10px' }} 
                />
                Paket Data App
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-between align-items-center">
                <Nav className="me-auto">
                    <Link to="/home" className="nav-link">Home</Link>
                    <Link to="/profile" className="nav-link">Profile</Link>
                </Nav>
                <Button 
                    variant="danger" 
                    className="mt-3 ms-2 px-4 py-2"
                    style={{
                        borderRadius: '30px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        height: '40px',  
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '-5px',  
                    }} 
                    onClick={handleLogout}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#d9534f'; 
                        e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#c9302c'; 
                        e.target.style.transform = 'scale(1)';
                    }}
                >
                    Logout
                </Button>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarComponents;
