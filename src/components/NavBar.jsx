import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { removeUser } from '../utils/userSlice'
import axios from 'axios'

const NavBar = () => {
    const user = useSelector((store) => store.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout= async () => {
        try {
            await axios.post(BASE_URL + "/logout", {}, {withCredentials : true})
            dispatch(removeUser());
            return navigate("/login")
        }
        catch(err) {
            res.status(400).send("Login Failed")
        }
    }
    return (
        <div className="fixed top-0 w-full bg-gradient-to-b from-black flex  justify-between z-40 h-79">
            <div className="p-3">
                <a className="text-lg font-semibold">DevMate</a>
            </div>
            {user && (
                <div className="flex items-center gap-2">
                    <p>Welcome, {user.firstName}</p>
                    <div className="dropdown dropdown-end mr-2">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={user.photoUrl} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><Link to="/connections">Connections</Link></li>
                            <li><Link to="/requests">Requests</Link></li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NavBar