import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, styled, Typography } from '@mui/material';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {  getCartFn, getProductFn, postCartFn, updateCartFn } from '../api/ApiHandler';

const Home = () => {
    const [productList, setProductList] = useState([]);
    const fetchData = async () => {
        try {
            const data = await getProductFn();
            setProductList(data);
        } catch (error) {
            console.log("Fetch error:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const handleAddToCart = async (e, row) => {
        e.preventDefault();
        try {
            const cartItems = await getCartFn();
            const existingItem = cartItems.find(item => item.productId === row.id);

            if (existingItem) {
                const updatedItem = {
                    ...existingItem,
                    quantity: existingItem.quantity + 1,
                };
                await updateCartFn(existingItem.id, updatedItem);
                console.log("Updated quantity:", updatedItem);
            } else {
                const cartItem = {
                    productId: row.id, 
                    name: row.name,
                    price: row.price,
                    quantity: 1,
                };
                const response = await postCartFn(cartItem);
                console.log("Added to cart:", response);
            }
        } catch (error) {
            console.error("Cart error:", error.response ? error.response.data : error.message);
        }
    };
    const StyledCard = styled(Card)(({ theme }) => ({
        maxWidth: 270,
        minWidth: 270,
        margin: theme.spacing(2),
        boxShadow: theme.shadows[3],
        transition: 'transform 0.2s',
        '&:hover': {
            transform: 'scale(1.05)'
        },
        height: 200
    }));
    return (
        <div className="pt-8">
            <div className="ps-10 pb-7 font-bold text-2xl">Product List</div>
            <Grid container spacing={1} className="mx-7">
                {productList.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <StyledCard >
                            <CardHeader
                                className="bg-gradient-to-br from-[#1e3c73] to-[#162D54]"
                                title={
                                    <Box>
                                        <Typography variant="h6" className="text-white h-10">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body1" className="text-orange-200">
                                            $ {(product.price).toFixed(2)}
                                        </Typography>
                                    </Box>
                                }
                            />
                            <Divider />
                            <CardContent>
                                <Box>
                                    <Typography variant="body2" className="text-gray-500 italic">
                                        {product.description}
                                    </Typography>
                                    <div className="flex justify-end mt-3">
                                        <FontAwesomeIcon
                                            icon={faShoppingCart}
                                            className="text-[#1e3c73] cursor-pointer"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleAddToCart(e, product);
                                            }}
                                        />
                                    </div>
                                </Box>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>

        </div>
    );
};

export default Home;