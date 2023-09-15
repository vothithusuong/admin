import React, { useEffect, useState } from 'react'
import "./popupUpdate.scss"
import { Avatar, TextField } from "@mui/material";
import { getListUser, handleUpdate, handleCreate } from "../../../context/userContext/apiCalls"
import { Select, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ModeIcon from '@mui/icons-material/Mode';
import ControlPointIcon from '@mui/icons-material/ControlPoint';


const Popup = ({ setOpenModal, data, setNoti, createUpdate, setDataUser }) => {
    const [dataUser, setDataUserUpdate] = useState(createUpdate == 1 ? data : "")
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState(createUpdate == 1 ? data.image : "")

    const handleChangeSwitch = (e) => {
        setDataUserUpdate({ ...dataUser, isAdmin: e });
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setDataUserUpdate({ ...dataUser, [e.target.name]: value });
    };

    const handleImageChange = async(e) => {
        if (e.target.files[0]) {
            //setImage(e.target.files[0])
            const fileName = "lib-lytutrong" + new Date().getTime() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds();
            const imageRef = ref(storage, fileName)
            setLoading(true)
            await uploadBytes(imageRef, e.target.files[0]).then(() => {
                getDownloadURL(imageRef).then((url) => {
                    setUrl(url)
                    setDataUserUpdate({ ...dataUser, image: url });
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
    // const handleSubmit = () => {
    //     const fileName = "lib-lytutrong" + new Date().getTime() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds();
    //     const imageRef = ref(storage, fileName)
    //     uploadBytes(imageRef, image).then(() => {
    //         getDownloadURL(imageRef).then((url) => {
    //             setUrl(url)
    //             setDataUserUpdate({ ...dataUser, image: url });
    //         }).catch(err => {
    //             console.log(err.message, "Lỗi lấy url")
    //         })
    //         setImage(null)
    //     })
    //         .catch((err) => {
    //             console.log(err.message, "Lỗi up ảnh")
    //         })
    // }

    return (
        <div className="modalBackground">
            <div className="modalContainerUpdate">
                {
                    createUpdate == 1 ?
                        <div className="title">
                            Thông tin người dùng
                        </div>
                        :
                        <div className="title">
                            Thêm người dùng mới
                        </div>
                }
                {
                    createUpdate == 1 ?
                        <div className="body">
                            <div className='avatarUser'>
                                <Avatar src={url} alt="" sx={{ width: 150, height: 150 }} />
                                <input id="file" type="file" accept='image/png, image/jpg, image/jpeg' onChange={handleImageChange} className="addImage" />
                                {/* <label htmlFor="file" className='buttonImage'>Chọn hình ảnh</label> */}
                                {/* <button onClick={handleSubmit}>Xác nhận</button> */}
                                <div className='fade'>
                                </div>
                                <label className='modify' htmlFor="file">
                                    <ModeIcon />
                                </label>
                            </div>
                            <div className='fieldInfor'>
                                <div>
                                    <TextField
                                        required
                                        size='small'
                                        id="outlined-required"
                                        label="Họ và Tên"
                                        name='name'
                                        defaultValue={data.name}
                                        onChange={handleChange}
                                        sx={{
                                            '& > :not(style)': { marginLeft: "10px", width: '25ch' },
                                        }}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        required
                                        disabled
                                        size='small'
                                        name='phone'
                                        id="outlined-required"
                                        label="Số điện thoại"
                                        defaultValue={data.phone}
                                        sx={{
                                            '& > :not(style)': { marginLeft: "10px", width: '25ch', marginTop: "10px" },
                                        }}
                                    />
                                </div>

                            </div>

                        </div>
                        :
                        <div className="body">
                            <div className='avatarUser'>
                                <Avatar src={url} alt="" sx={{ width: 150, height: 150 }} />
                                <input id="file" type="file" accept='image/png, image/jpg, image/jpeg' onChange={handleImageChange} className="addImage" />
                                {/* <button style={{ marginTop: 10 }} onClick={handleSubmit}>Xác nhận</button> */}
                                <div className='fade'>
                                </div>
                                <label className='modify' htmlFor="file">
                                    <ControlPointIcon style={{ fontSize: "30px" }} />
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
                                            onChange={handleChange}
                                            sx={{
                                                '& > :not(style)': { marginLeft: "10px", width: '25ch' },
                                            }}

                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            required
                                            size='small'
                                            id="outlined-required"
                                            label="CCCD/ Mã định danh"
                                            name='idcard'
                                            onChange={handleChange}
                                            sx={{
                                                '& > :not(style)': { marginLeft: "10px", width: '25ch', marginTop: "10px" },
                                            }}

                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            required
                                            size='small'
                                            className='phone'
                                            id="outlined-required"
                                            label="Số điện thoại"
                                            name='phone'
                                            onChange={handleChange}
                                            sx={{
                                                '& > :not(style)': { marginLeft: "10px", width: '25ch', marginTop: "10px" },
                                            }}
                                        />
                                        <div>
                                            <Switch
                                                checkedChildren={<CheckOutlined />}
                                                unCheckedChildren={<CloseOutlined />}
                                                defaultChecked={false}
                                                onChange={handleChangeSwitch}
                                                style={{ marginLeft: "10px", marginTop: "10px", marginBottom: "10px" }}
                                            />
                                        </div>

                                    </div>

                                </div>

                            </form>


                        </div>
                }
                <div className="footer">
                    <button
                        onClick={() => {
                            setOpenModal(false)
                        }}
                        id="cancelBtn">
                        Đóng
                    </button>
                    {
                        createUpdate == 1 ?
                            <button disabled={loading} onClick={async () => {
                                setLoading(true)
                                await handleUpdate(data._id, dataUser, setNoti, setOpenModal)
                                const userList = await getListUser(setNoti)
                                setDataUser(userList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
                                setLoading(false)
                            }
                            }>
                                {
                                    loading ?
                                        <div className='Loader' />
                                        :
                                        <>Cập nhật</>
                                }
                            </button>
                            :
                            <button disabled={loading} onClick={async () => {
                                setLoading(true)
                                await handleCreate(dataUser, setNoti, setOpenModal)
                                const userList = await getListUser(setNoti)
                                setDataUser(userList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
                                setLoading(false)
                            }
                            }>
                                {
                                    loading ?
                                        <div className='Loader' />
                                        :
                                        <>Thêm mới</>
                                }
                            </button>
                    }

                </div>
            </div>
        </div >
    )
}

export default Popup