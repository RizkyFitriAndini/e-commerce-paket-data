import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Image, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();  
    const user = JSON.parse(localStorage.getItem('user'));  

    const [profilePic, setProfilePic] = useState(null);  
    const [isEditing, setIsEditing] = useState(false);  // Track if the user is editing

    // Load profile picture from localStorage
    useEffect(() => {
        const savedProfilePic = localStorage.getItem('profilePic');
        if (savedProfilePic) {
            setProfilePic(savedProfilePic); 
        }
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);  // Set the profile picture after reading the file
            };
            reader.readAsDataURL(file);  // Convert the file to base64
        }
    };

    const handleSave = () => {
        if (profilePic) {
            localStorage.setItem('profilePic', profilePic); 
            alert('Profile picture saved successfully!');
            setIsEditing(false);  // Disable editing mode after saving
        } else {
            alert('Please upload a picture before saving.');
        }
    };

    if (!user) {
        return (
            <div className="text-center">
                <h3>You are not logged in. Please log in to view your profile.</h3>
                <Link to="/">
                    <Button variant="primary">Go to Login</Button>
                </Link>
            </div>
        );
    }

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Row className="w-100">
                <Col md={6} className="mx-auto">
                    <Card className="text-center p-4 shadow-lg">
                        <Card.Body>
                            <div className="mb-4">
                                <Image
                                    src={profilePic || "https://via.placeholder.com/150"} 
                                    roundedCircle
                                    width="150"
                                    height="150"
                                />
                            </div>
                            <Card.Title>{user.name}'s Profile</Card.Title>
                            <Card.Text>
                                <strong>Email:</strong> {user.email}
                            </Card.Text>

                            {isEditing ? (
                                <>
                                    <Form.Group controlId="formProfilePic">
                                        <Form.Label>Upload Profile Picture</Form.Label>
                                        <Form.Control 
                                            type="file" 
                                            onChange={handleFileChange} 
                                        />
                                    </Form.Group>
                                    <div className="d-flex justify-content-center mt-3">
                                        <Button 
                                            variant="primary" 
                                            className="me-2" 
                                            onClick={handleSave}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <Button 
                                    variant="secondary" 
                                    className="mt-3" 
                                    onClick={() => setIsEditing(true)}  // Enable editing when clicked
                                >
                                    Edit
                                </Button>
                            )}
                         <div className="mt-2">
                            <Link to="/home">
                                <Button variant="binary border" className="mt-1">
                                    Back to Home
                                </Button>
                            </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
