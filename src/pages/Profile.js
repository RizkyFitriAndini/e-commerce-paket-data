import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Image, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();  
    const user = JSON.parse(localStorage.getItem('user'));  

    const [profilePic, setProfilePic] = useState(null);  

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(URL.createObjectURL(file));  
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

                            <Form.Group controlId="formProfilePic">
                                <Form.Label>Upload Profile Picture</Form.Label>
                                <Form.Control 
                                    type="file" 
                                    onChange={handleFileChange} 
                                />
                            </Form.Group>

                            <Link to="/home">
                                <Button variant="primary" className="mt-3">
                                    Back to Home
                                </Button>
                            </Link>

                                
                           
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
