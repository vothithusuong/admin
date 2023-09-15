import React, { useState, useContext } from 'react'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import "./popupUserInfo.scss"
import { handleUserUpdate, handleUpdatePassword } from "../../../context/userContext/apiCalls"
import TabContext from '@mui/lab/TabContext';
import { Avatar, Tooltip, Chip, Tab, TextField } from "@mui/material";
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import KeyIcon from '@mui/icons-material/Key';
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AuthContext } from "../../../context/authContext/AuthContext";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormHelperText } from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';

const PopupUserInfo = ({ setOpenModal, user, setNoti }) => {
    const [valueTab, setValueTab] = useState("1")
    const handleChangeTab = async (event, newValue) => {
        setValueTab(newValue);
    };
    const [password, setPassword] = useState("");
    const { isFetching, dispatch } = useContext(AuthContext);
    const [userdata, setUserData] = useState(user)
    const [url, setUrl] = useState(user.image)
    const [image, setImage] = useState(null)
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordNew, setShowPasswordNew] = useState(false);
    const [showPasswordRep, setShowPasswordRep] = useState(false);
    const [newPassword, setNewPassword] = useState(false);
    const [newRepPassword, setNewRepPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setUserData({ ...userdata, [e.target.name]: value });
    };

    const handlePassword = async () => {
        setLoading(true)
        if (newPassword != newRepPassword) {
            setErrorMessage(['Nhập lại mật khẩu mới không khớp!'])
        }
        else {
            const data = {
                oldPassword: password,
                newPassword: newPassword,
                repPassword: newRepPassword
            }
            await handleUpdatePassword(data, setNoti, setOpenModal)
            setLoading(false)
        }
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPasswordNew = () => setShowPasswordNew((show) => !show);
    const handleClickShowPasswordRep = () => setShowPasswordRep((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleImageChange = async (e) => {
        if (e.target.files[0]) {
            //setImage(e.target.files[0])
            const fileName = "lib-lytutrong" + new Date().getTime() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds();
            const imageRef = ref(storage, fileName)
            setLoading(true)
            await uploadBytes(imageRef, e.target.files[0]).then(() => {
                getDownloadURL(imageRef).then((url) => {
                    setUrl(url)
                    setUserData({ ...userdata, image: url });
                }).catch(err => {
                    console.log(err.message, "Lỗi lấy url")
                })
                setImage(null)
            })
                .catch((err) => {
                    console.log(err.message, "Lỗi up ảnh")
                })
            setLoading(false)
        }
    }

    return (
        <div className="modalBackgroundUserInfor">
            <div className="modalContainerUserInfor">
                <TabContext value={valueTab}>
                    <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                        <Tab icon={<PersonPinIcon />} label={"Thông tin cá nhân"} value="1" />
                        <Tab icon={<KeyIcon />} label={"Thay đổi mật khẩu"} value="2" />
                    </TabList>
                    <TabPanel value={"1"} index={0} sx={{ padding: "0px" }}>
                        <div className='body'>
                            <div className='info'
                            // style={{display: "flex"}}
                            >
                                <div className='avatarUser'>
                                    <Avatar src={url} alt="" sx={{ width: "184px", height: "184px" }} />
                                    <input id="file" type="file" accept='image/png, image/jpg, image/jpeg' onChange={handleImageChange} className="addImage" style={{ display: "none" }} />
                                    <div className='fade'>
                                    </div>
                                    <label className='modify' htmlFor="file">
                                        <ModeIcon style={{ fontSize: "30px" }} />
                                    </label>
                                </div>
                                <form className='userInfor'>
                                    <div className='fieldInfor'>
                                        <div>
                                            <TextField
                                                required
                                                size='small'
                                                id="outlined-required"
                                                label="Họ và Tên"
                                                name='name'
                                                defaultValue={user.name}
                                                onChange={handleChange}
                                                sx={{
                                                    '& > :not(style)': { marginLeft: "20px", width: "160px" },
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                required
                                                size='small'
                                                id="outlined-required"
                                                label="Số điện thoại"
                                                name='phone'
                                                defaultValue={user.phone}
                                                onChange={handleChange}
                                                sx={{
                                                    '& > :not(style)': { marginLeft: "20px", marginTop: "30px", width: "160px" },
                                                }}

                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="footer">
                            <button
                                onClick={() => {
                                    setOpenModal(false)
                                }}
                                id="cancelBtn"
                            >
                                Đóng
                            </button>
                            <button
                                disabled={loading}
                                onClick={async () => {
                                    setLoading(true)
                                    await handleUserUpdate(user._id, userdata, setNoti, setOpenModal)
                                    setLoading(false)
                                }}
                            >
                                {
                                    loading ?
                                        <div className='Loader' />
                                        :
                                        <>Cập nhật</>
                                }
                            </button>
                        </div>
                    </TabPanel>
                    <TabPanel value={"2"} index={0} sx={{ padding: "0px" }}>
                        <div>
                            <FormControl sx={{ marginTop: "20px" }}
                                variant="outlined"
                                size="small"
                                id="outlined-required"
                                required
                                fullWidth
                                onChange={(e) => setPassword(e.target.value)}>
                                <InputLabel htmlFor="outlined-adornment-password">Mật khẩu hiện tại</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Mật khẩu hiện tại"
                                />
                            </FormControl>

                        </div>
                        <div>
                            <FormControl sx={{ marginTop: "10px" }}
                                variant="outlined"
                                size="small"
                                id="outlined-required"
                                required
                                fullWidth
                                error={Boolean(errorMessage.length)}
                                onChange={(e) => setNewPassword(e.target.value)}>
                                <InputLabel htmlFor="outlined-adornment-password">Mật khẩu mới</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPasswordNew ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPasswordNew}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPasswordNew ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Mật khẩu mới"
                                />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl sx={{ marginTop: "10px" }}
                                variant="outlined"
                                size="small"
                                id="outlined-required"
                                required
                                fullWidth
                                error={Boolean(errorMessage.length)}
                                onChange={(e) => setNewRepPassword(e.target.value)}>

                                <InputLabel htmlFor="outlined-adornment-password">Nhập lại mật khẩu mới</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPasswordRep ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPasswordRep}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPasswordRep ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Nhập lại mật khẩu mới"
                                />
                                <FormHelperText sx={{ marginLeft: "0px" }}>{errorMessage[0]}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className="footer">
                            <button
                                onClick={() => {
                                    setOpenModal(false)
                                }}
                                id="cancelBtn"
                            >
                                Đóng
                            </button>
                            <button
                                disabled={loading}
                                onClick={handlePassword}
                            >
                                {
                                    loading ?
                                        <div className='Loader' />
                                        :
                                        <>Cập nhật</>
                                }
                            </button>
                        </div>
                    </TabPanel>
                </TabContext>

            </div>
        </div >
    )
}

export default PopupUserInfo