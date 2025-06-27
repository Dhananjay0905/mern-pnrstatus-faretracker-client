import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import './RegistrationPage.css';

const RegistrationPage = () => {
    const [registrationData, setRegistrationData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        name: '',
        dob: '',
        nationality: '',
        age: '',
        mobile: '',
    });

    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (registrationData.username.length < 5) {
            newErrors.username = 'Username must be at least 5 characters long';
        }

        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        if (!passwordPattern.test(registrationData.password)) {
            newErrors.password = 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one special symbol, and one number';
        }

        if (registrationData.password !== registrationData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(registrationData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (registrationData.mobile.length !== 10) {
            newErrors.mobile = 'Mobile number must be exactly 10 digits';
        }

        if (registrationData.age <= 18) {
            newErrors.age = 'Age must be greater than 18';
        }

        Object.keys(registrationData).forEach((key) => {
            if (/\s/.test(registrationData[key])) {
                newErrors[key] = 'No spaces are allowed';
            }
        });

        return newErrors;
    };

    const handleRegistrationSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post('https://mern-pnrstatus-faretracker-server.onrender.com/register', registrationData);
            console.log('Registration Successful:', response.data);
            setRedirectToLogin(true);
            setRegistrationData({
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
                name: '',
                dob: '',
                nationality: '',
                age: '',
                mobile: '',
            });
            setErrors({});
        } catch (error) {
            console.error('Registration error:', error);
            if (error.response && error.response.data) {
                alert(error.response.data.msg || 'Registration failed');
            } else {
                alert('Registration failed');
            }
        }


    };

    const handleRegistrationChange = (e) => {
        const { name, value } = e.target;
        setRegistrationData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    if (redirectToLogin) {
        return <Navigate to="/" />;
    }

    return (
        <div className="registration-container">
            <div className="registration-imageContainer"></div>
            <div className="registration-formContainer">
                <h1>Registration</h1>
                <form className="registration-form" onSubmit={handleRegistrationSubmit}>
                    <div className="registration-formRow">
                        <div className="registration-column1">
                            <input
                                className="registration-input"
                                type="text"
                                name="username"
                                placeholder="Enter Username"
                                required
                                value={registrationData.username}
                                onChange={handleRegistrationChange}
                            />
                            {errors.username && <p className="registration-error">{errors.username}</p>}
                            <input
                                className="registration-input"
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                required
                                value={registrationData.password}
                                onChange={handleRegistrationChange}
                            />
                            {errors.password && <p className="registration-error">{errors.password}</p>}
                            <input
                                className="registration-input"
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                required
                                value={registrationData.confirmPassword}
                                onChange={handleRegistrationChange}
                            />
                            {errors.confirmPassword && <p className="registration-error">{errors.confirmPassword}</p>}
                            <input
                                className="registration-input"
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                required
                                value={registrationData.email}
                                onChange={handleRegistrationChange}
                            />
                            {errors.email && <p className="registration-error">{errors.email}</p>}
                        </div>
                        <div className="registration-column2">
                            <input
                                className="registration-input"
                                type="text"
                                name="name"
                                placeholder="Enter Name"
                                required
                                value={registrationData.name}
                                onChange={handleRegistrationChange}
                            />
                            <input
                                className="registration-input"
                                type="text"
                                name="nationality"
                                placeholder="Enter Nationality"
                                required
                                value={registrationData.nationality}
                                onChange={handleRegistrationChange}
                            />
                            <input
                                className="registration-input"
                                type="number"
                                name="age"
                                placeholder="Enter Age"
                                required
                                value={registrationData.age}
                                onChange={handleRegistrationChange}
                            />
                            {errors.age && <p className="registration-error">{errors.age}</p>}
                            <input
                                className="registration-input"
                                type="number"
                                name="mobile"
                                placeholder="Enter Mobile Number"
                                required
                                value={registrationData.mobile}
                                onChange={handleRegistrationChange}
                            />
                            {errors.mobile && <p className="registration-error">{errors.mobile}</p>}
                        </div>
                    </div>
                    <button className="registration-button" type="submit">Register</button>
                    <p className='linkp'>
                        Already registered? <Link className="registration-link" to="/">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;
