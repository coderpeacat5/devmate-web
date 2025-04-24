import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import { BASE_URL, BG_URL } from '../utils/constants';

const Login = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("gayatri@gmail.com");
    const [password, setPassword] = useState("Gayatri@123");
    const [error, setError] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true)
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
            navigate("/feed")
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
            <div className='absolute inset-0 w-full h-full overflow-x-hidden overflow-y-auto'>
                <img src={BG_URL} alt='background-image' className='w-full h-full object-cover bg-repeat-round' />
            </div>
            <div className="card card-border w-80 bg-black bg-opacity-80  mt-16">
                <div className="card-body">
                    <h2 className="card-title justify-center ">{isLoginForm ? "Sign In" : "Sign Up"}</h2>

                    {!isLoginForm &&
                        <>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-sm">First Name</legend>
                                <input type="text" className="input focus:outline-none" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-sm">Last Name</legend>
                                <input type="text"
                                    className="input focus:outline-none"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)} />
                            </fieldset>
                        </>}

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-sm">Email ID</legend>
                        <input type="text" className="input focus:outline-none" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-sm">Password</legend>
                        <input type="text"
                            className="input focus:outline-none mb-0"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </fieldset>

                    <p className='text-red-500 font-medium mt-2'>{error}</p>

                    <div className="card-actions justify-center mt-1">
                        <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Sign In" : "Sign Up"}</button>
                    </div>

                    <p onClick={() => setIsLoginForm((value) => !value)}>
                        {isLoginForm ? (
                            <div className='mt-2'>
                                New to DevMate? <button className='font-semibold text-blue-300 hover:text-blue-400'>Sign Up now</button>
                            </div>
                        ) : (
                            <div className='mt-2'>
                                Already have an account? <button className='font-semibold text-blue-300 hover:text-blue-400'>Sign In</button>
                            </div>
                        )}
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Login