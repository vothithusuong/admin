import "./navbar.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { getUser } from "../../context/userContext/apiCalls"
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user } = useContext(AuthContext)
  const [userInfo, setUserInfo] = useState("")
  const { dispatch } = useContext(AuthContext)
  useEffect(() => {
    (async () => {
      const userList = await getUser(dispatch)
      setUserInfo(userList?.data?.data)
    })()
    return;
  }, [])
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <img
              src={userInfo.image}
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
