import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from './Card';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" />;
    }
    return children;
};

const Dashboard = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({ items: [] });
    const [cartItemCount, setCartItemCount] = useState(0);

    const addToCart = async (productId, quantity, totalPrice,) => {
        if (!Number.isInteger(quantity) || quantity <= 0) {
            console.error("Invalid quantity");
            return;
        }
        try {
            const userId = localStorage.getItem("userId");
            console.log("userId here", userId)

            const response = await axios.post('http://localhost:8080/auth/api/addcart', {
                userId,
                productId,
                quantity,
                totalPrice,

            });
            setCart(response.data.cart);
            setCartItemCount(response.data.cart.items.length);
            toast.success('Item added to Cart.!', {
                position: 'top-right',
                autoClose: 1000,
            });
        

        } catch (error) {
            console.error("Failed to add item to cart", error);
            toast.error('Failed to add product', {
                position: 'top-right',
                autoClose: 5000,
            });
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    const GetProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/auth/api/getproducts');
            const data = response.data;
            setProducts(data.products);
        } catch (error) {
            console.log("Error in fetching products", error);
        }
    };

    const GetCart = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`http://localhost:8080/auth/api/getcart/${userId}`);
            const cartData = response.data;
            setCart(cartData || { items: [] });
            setCartItemCount(cartData.items.length);
        } catch (error) {
            console.log("Failed to fetch the cart", error);
        }
    };

    useEffect(() => {
        GetProducts();
        GetCart();
    }, []);

    return (
        <ProtectedRoute>
            <div className="navbar bg-base-100 shadow-md p-4">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-2xl font-bold text-primary">E-Commerce</a>
                </div>
                <div className="flex-none">
                     <div>
                        <button onClick={handleLogout} className='py-3 px-6 bg-red-500 rounded-md text-white'><p className='font-semibold text-xl'>Logout</p></button>
                     </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="badge badge-sm indicator-item bg-primary text-white">{cart.items.length}</span>
                            </div>
                        </div>
                        <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-60 shadow-lg">
                            <div className="card-body">
                                <div className="card-actions">
                                    <button
                                        className="btn btn-primary btn-block"
                                        onClick={() => navigate('/cart')}>
                                        View Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                  
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full border border-primary">
                                <img alt="User Avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 p-4">
                {products.map((item) => (
                    <Card key={item._id} items={item} addToCart={addToCart} />
                ))}
            </div>
            <ToastContainer />
        </ProtectedRoute>


    );
};

export default Dashboard;
