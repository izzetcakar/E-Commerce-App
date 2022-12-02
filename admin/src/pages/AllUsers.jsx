import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const { search } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const { data } = await axios.get("/user");
      setUsers(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const deleteUser = async (id) => {
    try {
      await axios.delete(`/user/${id}`);
      getUsers();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="AllUsersContainer">
      {users &&
        users
          .filter((item) => {
            if (search === "") return item;
            else if (item.username.toLowerCase().includes(search.toLowerCase()))
              return item;
          })
          .map((user) => (
            <div className="UserContainer" key={user._id}>
              <h2 className="Title">{user.username}</h2>
              <button
                className="Location"
                onClick={() => navigate(`/profile/${user._id}`)}
              >
                Profile
              </button>
              <button
                className="Location"
                onClick={() => navigate(`/orders/${user._id}`)}
              >
                Orders
              </button>
              <button className="Location" onClick={() => deleteUser(user._id)}>
                Delete User
              </button>
            </div>
          ))}
    </div>
  );
};

export default AllUsers;
