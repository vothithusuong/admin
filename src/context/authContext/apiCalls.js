import axios from "axios";
import { loginFailure, loginStart, loginSuccess, logout } from "./AuthAction";

const BACK_END_URL = process.env.REACT_APP_BACKEND_URL
export const login = async (user, dispatch, setNotify) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(BACK_END_URL + "/users/login", user);
    if (res.data.success == true) {
      localStorage.setItem("user", JSON.stringify(res.data.data))
      setTimeout(() => {
        dispatch(logout())
        logoutAdmin(dispatch, setNotify)
      }, res.data.data.expire_in)
      setNotify({
        isOpen: true,
        message: res.data.msg,
        type: "success",
      });
      dispatch(loginSuccess(res.data.data));
    }
    if (res.data.success == false) {
      setNotify({
        isOpen: true,
        message: res.data.msg,
        type: "error",
      });
      dispatch(loginFailure());
    }
  } catch (err) {
    setNotify({
      isOpen: true,
      message: "Lỗi đăng nhập: " + err,
      type: "error",
    });
    dispatch(loginFailure());
  }
};


export const logoutAdmin = async (dispatch, setNotify) => {
  localStorage.removeItem("user")
  setNotify({
    isOpen: true,
    message: "Đăng xuất thành công!",
    type: "success",
  });
  dispatch(logout());

};