import React, { useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from '../axios';
import { Container, Form, Button, Table, Row, Col } from 'react-bootstrap';

const Cart = () => {
    const location = useLocation();
    const cartItems = location.state.cartItems || [];
    const cartId = location.state.cartId;
    const [deliveryDetails, setDeliveryDetails] = useState('');
    const navigate = useNavigate();

    const handleOrder = async () => {
        try {
            const orderData = {
                deliveryDetails,
                cartItems: cartItems.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity
                }))
            };

            await axios.post(`/Order/${cartId}`, orderData);
            console.log('Order placed successfully.');
            navigate('/products');
            // Navigate to a success or order confirmation page if needed
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <Container className="mt-4">
            <h2>Cart Details</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                </tr>
                </thead>
                <tbody>
                {cartItems.map(item => (
                    <tr key={item.productId}>
                        <td>{item.productName}</td>
                        <td>{item.quantity}</td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Form>
                <Form.Group className="mb-3" controlId="formDeliveryDetails">
                    <Form.Label>Delivery Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter delivery address"
                        value={deliveryDetails}
                        onChange={(e) => setDeliveryDetails(e.target.value)}
                    />
                </Form.Group>

                <Row className="mt-4">
                    <Col className="text-right">
                        <Button onClick={handleOrder} variant="success">
                            Order
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default Cart;
