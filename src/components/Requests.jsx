import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.request)

    const reviewRequests = async (status, _id) => {
        try {
            const res = await axios.post(
                BASE_URL + "/request/review/" + status + "/" + _id,
                {},
                { withCredentials: true }
            )
            dispatch(removeRequest(_id))

            setShowToast(`Request ${status === "accepted" ? "accepted" : "rejected"} successfully!`);
            setTimeout(() => {
                setShowToast(false);
            }, 2000);
        }
        catch (err) {
            console.log(err);
        }
    }

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true })
            dispatch(addRequests(res.data.data))
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchRequests()
    }, [])

    if (!requests) return;

    if (requests.length === 0) return <h1 className='flex justify-center mt-72'>No requests found!!</h1>

    return (
        <div className='pt-8 flex flex-col justify-center items-center my-5'>
            <h1 className='font-bold text-2xl mb-8'>Requests</h1>
            {showToast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>{showToast}</span>
                    </div>
                </div>
            )}

            {requests.map((request) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

                return (
                    <div key={_id} className="w-1/2 flex justify-between items-center m-4 p-4 rounded-lg bg-base-300  mx-auto">
                        <div>
                            <img
                                alt="photo"
                                className="w-20 h-20 rounded-lg"
                                src={photoUrl}
                            />
                        </div>
                        <div className="text-left mx-4 ">
                            <h2 className="font-bold text-xl">
                                {firstName + " " + lastName}
                            </h2>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                        </div>
                        <div>
                            <button
                                className=' bg-green-600 hover:bg-green-700 btn rounded-md ml-16 mr-4'
                                onClick={() => reviewRequests("accepted", request._id)}>
                                Accept
                            </button>
                            <button
                                className='bg-red-600 hover:bg-red-700 btn rounded-md mr-2'
                                onClick={() => reviewRequests("rejected", request._id)}>
                                Reject
                            </button>
                        </div>

                    </div>
                )
            })}
        </div>
    )
}

export default Requests