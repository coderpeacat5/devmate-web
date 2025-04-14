import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("gayatri@gmail.com");
    const [password, setPassword] = useState("Gayatri@123");
    const [error, setError] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/login",
                {
                    emailId, password
                },
                { withCredentials: true })
            dispatch(addUser(res.data))
            return navigate("/feed")
        } catch (err) {
            setError(err?.response?.data || "Something went wrong!!");
        }
    }

    const handleSignUp = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/signup",
                {
                    firstName, lastName, emailId, password
                },
                { withCredentials: true })
            dispatch(addUser(res.data.data))
            return navigate("/profile")
        } catch (err) {
            setError(err?.response?.data || "Something went wrong!!");
        }
    }

    return (
        <div className='flex justify-center items-center'>
            <div className="card card-border bg-base-200 w-96">
                <div className="card-body">
                    <h2 className="card-title justify-center">{isLoginForm ? "Sign In" : "Sign Up"}</h2>

                    {!isLoginForm &&
                        <>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-sm">First Name</legend>
                                <input type="text" className="input " value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-sm">Last Name</legend>
                                <input type="text"
                                    className="input"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)} />
                            </fieldset>
                        </>}

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-sm">Email ID</legend>
                        <input type="text" className="input " value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-sm">Password</legend>
                        <input type="text"
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </fieldset>

                    <p className='text-red-500 font-medium mt-2'>{error}</p>

                    <div className="card-actions justify-center mt-4">
                        <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Sign In" : "Sign Up"}</button>
                    </div>

                    <p onClick={() => setIsLoginForm((value) => !value)}>
                        {isLoginForm ? (
                            <div className='mt-2'>
                                New to DevMate? <button className='font-bold'>Sign Up now</button>
                            </div>
                        ) : (
                            <div className='mt-2'>
                                Already have an account? <button className='font-bold'>Sign In</button>
                            </div>
                        )}
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Login