import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { DarkModeContext } from "../../context/darkModeContext/darkModeContext";
import { useEffect, useContext, useState } from "react";
import Notification from "../../components/alert/Notification";
import { logoutAdmin } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import { logout } from "../../context/authContext/AuthAction";
import CategoryIcon from '@mui/icons-material/Category';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import PopupUserInfo from "../popup/popupUserInfo/PopupUserInfo"
import { getUser } from "../../context/userContext/apiCalls"

const Sidebar = () => {
  // const { dispatchDark } = useContext(DarkModeContext);
  const { user, dispatch } = useContext(AuthContext);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [userInfo, setUserInfo] = useState("")
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogout = (e) => {
    dispatch(logout())
    logoutAdmin(dispatch, setNotify);
  };
  useEffect(() => {
    (async () => {
      const userList = await getUser(dispatch)
      setUserInfo(userList?.data?.data)
    })()
    return;
  }, [])
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src="https://firebasestorage.googleapis.com/v0/b/lib-lututrong.appspot.com/o/favicon_w_trans.png?alt=media&token=de204428-9b31-446e-8623-c2467a173b28" alt="" style={{ width: 30, height: 20 }} />
          <span className="logo">Thư viện</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">THÔNG TIN TỔNG THỂ</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Trang chủ</span>
            </li>
          </Link>
          <p className="title">DANH SÁCH</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Tài khoản</span>
            </li>
          </Link>
          <Link to="/books" style={{ textDecoration: "none" }}>
            <li>
              <MenuBookIcon className="icon" />
              <span> Đầu sách</span>
            </li>
          </Link>
          <Link to="/category" style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon className="icon" />
              <span>Thể loại sách</span>
            </li>
          </Link>
          <Link to="/borrows" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Phiên mượn</span>
            </li>
          </Link>
          <Link to="/banner" style={{ textDecoration: "none" }}>
            <li>
              <ViewCarouselIcon className="icon" />
              <span>Banner</span>
            </li>
          </Link>
          <p className="title">TÀI KHOẢN CÁ NHÂN</p>
          <li onClick={async () => {
            setModalOpen(true)
          }}>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Thông tin cá nhân</span>
          </li>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Đăng xuất</span>
          </li>
        </ul>
      </div>
      {modalOpen &&
        <PopupUserInfo
          setOpenModal={setModalOpen}
          user={userInfo}
          setNoti={setNotify}
        />}
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
    </div>
  );
};

export default Sidebar;
