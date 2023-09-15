import React, { useState } from 'react'
import "./popupReset.scss"
import { resetPassword } from "../../../context/userContext/apiCalls"
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const PopupReset = ({ iduser, setOpenModal, setNoti }) => {
    const [data, setData] = useState({iduser: iduser})
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const value = e.target.value;
        setData({ ...data, password: value });
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className="modalBackgroundReset">
            <div className="modalContainerReset">
                <div className="title">
                    Nhập mật khẩu để xác nhận
                </div>
                <div className="bodyReset">
                    <div className='fieldInforReset'>
                        <div>
                        <FormControl sx={{ marginTop: "20px" }}
                                variant="outlined"
                                size="small"
                                id="outlined-required"
                                required
                                fullWidth
                                onChange={(e) => handleChange(e)}>
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
                    </div>

                </div>
                <div className="footerReset">
                    <button
                        onClick={() => {
                            setOpenModal(false)
                        }}
                        id="cancelBtnReset">
                        Đóng
                    </button>
                            <button 
                            disabled={loading}
                            onClick={async () => {
                                setLoading(true)
                                await resetPassword(data, setNoti, setOpenModal)
                                setLoading(false)
                            }
                            }>
                                {
                                    loading ?
                                    <div className='Loader' />
                                    :
                                    <>Xác nhận</>
                                } 
                            </button>
                </div>
            </div>
        </div >
    )
}

export default PopupReset