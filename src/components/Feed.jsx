import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/user/feed",  { withCredentials: true })
      console.log(res.data)
      dispatch(addFeed(res?.data))
    } catch (err) {
      res.status(400).send("Something went wrong!!")
    }
  }

  useEffect(() => {
    getFeed()
  }, [])

  if(!feed) return;

  if(feed.length === 0) return <h1 className='flex justify-center font-bold mt-32 text-xl'>No new users found!!</h1>

  return (
    feed && (
    <div className='flex items-center justify-center'><UserCard user={feed[0]}/></div>)
  )
}

export default Feed