import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const {_id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try{
      const res= await axios.post(BASE_URL + "/request/send/" + status + "/" + userId ,
        {},
        {withCredentials : true}
      )
      dispatch(removeUserFromFeed(userId))
    } catch(err) {
      console.log(err)
    }
  }
  return (
    <div className="card mt-12 pt-2 bg-base-100 w-80 shadow-2xl">
      <figure>
        <img src={photoUrl} alt="photo" className="w-40"/>
      </figure>
      <div className="card-body">
        <h2 className="card-title mb-2">{firstName + " " + lastName}</h2>
        <p className="text-base">{age && gender && age + ", " + gender}</p>
        <p className="text-base">{about}</p>
        <div className="card-actions justify-center my-3 mx-2">
          <button className="btn bg-red-600"
          onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
          <button className="btn bg-green-600"
          onClick={() => handleSendRequest("interested", _id)}>Send Request</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
