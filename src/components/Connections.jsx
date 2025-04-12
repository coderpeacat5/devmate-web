import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection)

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true })
      dispatch(addConnections(res.data.data))
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchConnections()
  }, [])

  if (!connections) return;

  if (connections.length === 0) return <h1>No Connection found!!</h1>

  return (
    <div className='flex flex-col justify-center items-center my-5'>
      <h1 className='font-bold text-2xl mb-8'>Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;

        return (
          <div key={_id} className='flex p-4 w-1/2 mt-4 mb-2 bg-base-300 rounded-lg'>
            <div >
              <img alt='user-photo' className='w-20' src={photoUrl}></img>
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Connections