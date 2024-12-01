import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import { API_URL } from '../utils/constants';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`${API_URL}users`);
            const user = response.data.find(
                (user) => user.email === email && user.password === password
            );

            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/home');
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while logging in');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Row className="justify-content-center w-100">
                <Col md={6} lg={4}>
                    <Card className="shadow-lg border-0">
                        <Card.Body>
                            <h3 className="text-center text-primary mb-4">Welcome!</h3>
                            <Form onSubmit={handleLogin}>
                                <Form.Group controlId="formBasicEmail" className="mb-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Enter email" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        required
                                        className="p-3"
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword" className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Enter password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        required
                                        className="p-3"
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100 py-2 mt-3">
                                    Login
                                </Button>
                            </Form>

                            {error && <p className="text-danger mt-2 text-center">{error}</p>}

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
