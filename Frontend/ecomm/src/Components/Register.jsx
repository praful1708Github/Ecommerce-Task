import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [value, setValue] = useState({
        fullName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
     const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:8080/auth/api/register', value);
            console.log('Registration successful', response);
            toast.success("Registration Successful", {
                position: 'top-right',
                autoClose: 5000,
            });
            navigate('/login')
        } catch (error) {
            console.error('Error in registration:', error.response?.data?.message || error.message);
            setError(error.response?.data?.message || 'Registration failed. Please try again.');
            toast.error('Registration Failed. Please Try Again.', {
                position: 'top-center',
                autoClose: 5000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h3 className="text-2xl font-semibold mb-4 text-center">Create an Account</h3>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="fullName"
                        value={value.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        required
                        className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        name="email"
                        value={value.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        required
                        className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        name="password"
                        value={value.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none disabled:bg-gray-400"
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                {error && <div className="mt-4 text-red-500 text-center">{error}</div>}

                <div className="mt-6 text-center">
                    <p className="text-sm">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-500 hover:underline">
                            Login here
                        </a>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
