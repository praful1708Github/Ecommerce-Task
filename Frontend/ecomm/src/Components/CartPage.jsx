import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 

const CartPage = () => {
    const [cartproducts, setCartProducts] = useState([]);
    const [orderStatus, setOrderStatus] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const navigate = useNavigate(); 

    const handleAddressChange = (e) => {
        setShippingAddress(e.target.value);
    };

    const GetCart = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`http://localhost:8080/auth/api/getcart/${userId}`);
            const Cartdata = response.data.items;
            setCartProducts(Cartdata);
        } catch (error) {
            console.log(error, 'Error fetching carts');
        }
    };

    const placeOrder = async () => {
        if (!shippingAddress.trim()) {
            setOrderStatus("Please provide a valid shipping address.");
            return;
        }
        try {
            const userId = localStorage.getItem('userId');
            const products = cartproducts.map(item => ({
                productId: item.productId._id,
                quantity: item.quantity,
                price: item.productId.price
            }));
            const orderData = {
                userId,
                products,
                totalPrice: cartproducts.reduce((total, item) => total + item.totalPrice, 0),
                shippingAddress
            };

            const response = await axios.post('http://localhost:8080/auth/api/place-order', orderData);

            if (response.data.message === "Order placed successfully") {
                setOrderStatus("Order placed successfully!");
                setTimeout(() => {
                    setCartProducts([]);
                    setOrderStatus("");
                }, 1000);
            } else {
                setOrderStatus("Failed to place order. Try again.");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            setOrderStatus("Error placing the order.");
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const userId = localStorage.getItem('userId');
            await axios.post('http://localhost:8080/auth/api/remove-cart', {
                userId,
                productId
            });

            setCartProducts(cartproducts.filter(item => item.productId._id !== productId));
        } catch (error) {
            console.log('Error removing product from cart:', error);
        }
    };

    useEffect(() => {
        GetCart();
    }, []);

    return (
        <div className="p-5">

            {cartproducts.length === 0 ? (
                <h1 className="text-center font-bold text-5xl">
                    Oops..Your cart is empty..! Please add some Products :)
                </h1>
            ) : (
                <div>
                    <table className="w-full border-collapse mb-5">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="p-3 border border-gray-300">Product</th>
                                <th className="p-3 border border-gray-300">Image</th>
                                <th className="p-3 border border-gray-300">Quantity</th>
                                <th className="p-3 border border-gray-300">Price</th>
                                <th className="p-3 border border-gray-300">Total</th>
                                <th className="p-3 border border-gray-300">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartproducts.map((item) => (
                                <tr key={item._id} className="text-left">
                                    <td className="p-3 border border-gray-300">{item.productId.title}</td>
                                    <td className="p-3 border border-gray-300">
                                        <img src={item.productId.image_url} alt={item.productId.title} className="w-20 h-auto" />
                                    </td>
                                    <td className="p-3 border border-gray-300">{item.quantity}</td>
                                    <td className="p-3 border border-gray-300">${item.productId.price.toFixed(2)}</td>
                                    <td className="p-3 border border-gray-300">${item.totalPrice.toFixed(2)}</td>
                                    <td className="p-3 border border-gray-300">
                                        <button
                                            onClick={() => removeFromCart(item.productId._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="text-right text-xl font-bold">
                        <p>Total: ${cartproducts.reduce((total, item) => total + item.totalPrice, 0).toFixed(2)}</p>
                    </div>
                </div>
            )}

            {orderStatus && (
                <div className="text-center mt-5 text-xl" style={{ color: orderStatus.includes("successfully") ? "green" : "red" }}>
                    <p>{orderStatus === "Order placed successfully!" ? "Your product will be delivered soon!" : orderStatus}</p>
                    {orderStatus.includes("successfully") && (
                        <button
                            className="mt-2.5 px-5 py-2.5 text-lg font-bold bg-blue-500 text-white border-none rounded-md cursor-pointer"
                            onClick={() => navigate("/dashboard")}
                        >
                            Go Back
                        </button>
                    )}
                </div>
            )}

            {!orderStatus.includes('successfully') && cartproducts.length > 0 && (
                <div className="mb-4">
                    <label className="text-lg font-bold block mb-1">Shipping Address</label>
                    <input
                        type="text"
                        value={shippingAddress}
                        onChange={handleAddressChange}
                        placeholder="Enter Your address"
                        className="w-full p-2 text-base border border-gray-300 rounded-md"
                    />
                </div>
            )}

            {cartproducts.length > 0 && !orderStatus.includes("successfully") && (
                <div className="flex justify-center mt-5">
                    <button
                        className="px-5 py-2.5 text-lg font-bold bg-blue-500 text-white border-none rounded-md cursor-pointer"
                        onClick={placeOrder}
                    >
                        Place Order
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartPage;
