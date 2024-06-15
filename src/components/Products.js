import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap'; // Added Form from react-bootstrap
import { Grid } from '@mui/material';
import {useNavigate} from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/product'); // Adjust the URL according to your backend
                setProducts(response.data.$values);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = (productId) => {
        const itemInCartIndex = cartItems.findIndex(item => item.productId === productId);

        if (itemInCartIndex !== -1) {
            const updatedCart = [...cartItems];
            updatedCart[itemInCartIndex].quantity++;
            setCartItems(updatedCart);
        } else {
            const productToAdd = {
                productId: productId,
                quantity: 1
            };
            setCartItems([...cartItems, productToAdd]);
        }
    };

    const incrementQuantity = (productId) => {
        const updatedCart = [...cartItems];
        const itemToUpdate = updatedCart.find(item => item.productId === productId);
        if (itemToUpdate) {
            itemToUpdate.quantity++;
            setCartItems(updatedCart);
        }
    };

    const decrementQuantity = (productId) => {
        const updatedCart = [...cartItems];
        const itemToUpdate = updatedCart.find(item => item.productId === productId);
        if (itemToUpdate && itemToUpdate.quantity > 1) {
            itemToUpdate.quantity--;
            setCartItems(updatedCart);
        }
    };

    const navigateToCart = async () => {
        try {
            const response = await axios.post('/cart', {
                userId: 1, // Replace with actual userId logic
                cartItems: cartItems.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity
                }))
            });
            console.log(response, "res");
            // Detailed cart items to include product names for display in Cart component
            const cartId = response.data.id;
            console.log(cartId, "cartId");
            const detailedCartItems = cartItems.map(item => {
                const product = products.find(p => p.id === item.productId);
                return {
                    ...item,
                    productName: product.name
                };
            });

            navigate('/cart', { state: { cartItems: detailedCartItems, cartId } });
            console.log('Cart saved successfully.');
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    };

    return (
        <Container className="mt-4">
            <Row>
                <Grid container spacing={4}>
                    {products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={2} key={product.id}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Button onClick={() => addToCart(product.id)} variant="primary" className="mb-2">
                                        Add
                                    </Button>
                                    <Form.Group className="d-flex">
                                        <Button variant="outline-primary" onClick={() => decrementQuantity(product.id)}>
                                            -
                                        </Button>
                                        <Form.Control
                                            type="number"
                                            value={cartItems.find(item => item.productId === product.id)?.quantity || 0}
                                            className="mx-2"
                                            readOnly
                                        />
                                        <Button variant="outline-primary" onClick={() => incrementQuantity(product.id)}>
                                            +
                                        </Button>
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Row>
            <Row className="mt-4">
                <Col className="text-right">
                    <Button onClick={navigateToCart} variant="success">
                        Next
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Products;
