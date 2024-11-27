import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import API_BASE_URL from "../ApiBaseUrl";

const Account = ({ onLoginUser, onLoginStaff }) => {

    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loginRole, setLoginRole] = useState("user");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        password: "",
    });
    const [passwordConditions, setPasswordConditions] = useState({
        hasUpperCase: false,
        hasMinLength: false,
        hasNumber: false,
        hasSpecialChar: false,
    });

    const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._-]*@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "password") {
            setPasswordConditions({
                hasUpperCase: /[A-Z]/.test(value),
                hasMinLength: value.length >= 8,
                hasNumber: /[0-9]/.test(value),
                hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const isEmailValid = emailRegex.test(formData.email);
    const isContactValid = formData.contact.length === 10 && /^[0-9]+$/.test(formData.contact);
    const isPasswordValid = Object.values(passwordConditions).every(Boolean);

    const handleSignup = (e) => {
        e.preventDefault();

        fetch(`${API_BASE_URL}user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.name,
                contact: formData.contact,
                mail: formData.email,
                pwd: formData.password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Registration response:", data);
                if (data.statusCode === 201) {
                    alert("Signup Successful");
                } else if (data.statusCode === 409) {
                    alert("User with email already exists.");
                } else {
                    console.error("Registration failed:", data.message);
                }
            })
            .catch((error) => console.error("Error registering:", error));
    };

    const handleLogin = (e) => {
        e.preventDefault();

        fetch(`${API_BASE_URL}user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ mail: formData.email, pwd: formData.password }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login response:", data);
                if (data.statusCode === 200) {
                    const userData = {
                        email: data.user.mail,
                        name: data.user.name,
                        contact: data.user.contact
                    };

                    alert("Login successful");

                    if (loginRole === "user") {
                        onLoginUser(userData);
                    } else {
                        onLoginStaff(userData);
                    }
                } else if (data.statusCode === 401) {
                    alert("Invalid Credentials. Please try again");
                } else {
                    console.error("Login failed:", data.message);
                    alert("Error logging into account");
                }
            })
            .catch((error) => console.error("Error logging in:", error));
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 flex justify-center items-center px-4">

            <div className="absolute md:top-12 md:left-12 top-4 left-6 hover:scale-110">
                <Link to="/" className="flex flex-row">
                    <img
                        src="back.png"
                        alt="Back"
                        className="md:w-10 md:h-9 w-8 h-7"
                    />
                </Link>
            </div>
            <div
                className="bg-white shadow-2xl rounded-xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden"
                style={{ minHeight: "550px" }}
            >
                <div
                    className={`transition-all duration-700 ease-in-out flex flex-col justify-center items-center w-full md:w-1/2 bg-gradient-to-r from-blue-500 to-blue-700 text-white p-8 ${isSignUp ? "order-2 md:order-1" : "order-1 md:order-1"
                        }`}
                >
                    <h1 className="text-3xl font-semibold mb-4">
                        {isSignUp ? "Welcome Back!" : "Hey!"}
                    </h1>
                    <p className="text-center mb-6">
                        {isSignUp
                            ? "Login with your personal details to stay connected."
                            : "Sign up and join the MenuLite community today!"}
                    </p>
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="bg-white text-blue-500 px-6 py-2 rounded-full shadow-lg hover:bg-gray-100 transition"
                    >
                        {isSignUp ? "Sign In" : "Sign Up"}
                    </button>
                </div>

                <div
                    className={`transition-transform duration-700 ease-in-out flex flex-col justify-center items-center w-full md:w-1/2 p-8 ${isSignUp ? "order-1 md:order-2" : "order-2 md:order-2"
                        }`}
                >
                    {isSignUp ? (
                        <div className="w-full max-w-md">
                            <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
                            <form>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Name"
                                    className={`w-full p-3 mb-2 border rounded focus:outline-none ${formData.name.length > 0 ? "border-green-500" : "border-gray-300"
                                        }`}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    className={`w-full p-3 mb-2 border rounded focus:outline-none ${formData.email ? !isEmailValid ? "border-red-500" : "border-green-500" : "border-gray-300"
                                        }`}
                                />
                                {!isEmailValid && formData.email && (
                                    <p className="text-red-500 text-sm mb-4">Invalid email</p>
                                )}
                                <input
                                    type="text"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleInputChange}
                                    placeholder="Contact"
                                    className={`w-full p-3 mb-2 border rounded focus:outline-none ${formData.contact ? !isContactValid ? "border-red-500" : "border-green-500" : "border-gray-300"
                                        }`}
                                />
                                {!isContactValid && formData.contact && (
                                    <p className="text-red-500 text-sm mb-4">
                                        Contact must be 10 digits
                                    </p>
                                )}
                                <div className="relative mb-2">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Password"
                                        className={`w-full p-3 border rounded focus:outline-none ${formData.password ? !isPasswordValid
                                            ? "border-red-500"
                                            : "border-green-500"
                                            : "border-gray-300"
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <div className="mb-4">
                                    {!isPasswordValid &&
                                        formData.password &&
                                        Object.entries(passwordConditions).map(([key, isValid]) => (
                                            <p
                                                key={key}
                                                className={`flex items-center text-sm ${isValid ? "text-green-500" : "text-red-500"
                                                    }`}
                                            >
                                                <span className="mr-2">
                                                    {isValid ? <FaCheckCircle /> : <FaCircle />}
                                                </span>
                                                {key === "hasUpperCase" && "At least one uppercase letter"}
                                                {key === "hasMinLength" && "Minimum 8 characters"}
                                                {key === "hasNumber" && "At least one number"}
                                                {key === "hasSpecialChar" && "At least one special character"}
                                            </p>
                                        ))}
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white w-full py-3 rounded hover:bg-blue-600 transition"
                                    disabled={
                                        !isEmailValid || !isContactValid || !isPasswordValid || !formData.name
                                    }
                                    onClick={handleSignup}
                                >
                                    Sign Up
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="w-full max-w-md">
                            <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>
                            <form>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    className="w-full p-3 mb-4 border rounded focus:outline-none"
                                />
                                <div className="relative mb-4">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({ ...formData, password: e.target.value })
                                        }
                                        className="w-full p-3 border rounded focus:outline-none"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <div className="flex items-center justify-around mb-6">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="user"
                                            checked={loginRole === "user"}
                                            onChange={() => setLoginRole("user")}
                                            className="mr-2"
                                        />
                                        Login as User
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="staff"
                                            checked={loginRole === "staff"}
                                            onChange={() => setLoginRole("staff")}
                                            className="mr-2"
                                        />
                                        Login as Staff
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white w-full py-3 rounded hover:bg-blue-600 transition"
                                    onClick={handleLogin}
                                >
                                    Sign In
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Account;