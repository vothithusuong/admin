import React, { useState, useEffect } from 'react'
import { TextField, Chip, Avatar } from "@mui/material";
import "./popupCate.scss"
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createCate, getListCate, updateCate } from "../../../context/cateContext/apiCalls"
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ModeIcon from '@mui/icons-material/Mode';

const PopupCate = ({ setOpenModal, createUpdate, category, data, setNoti, setDataBook }) => {
    const [dataBook, setDataBook1] = useState(createUpdate == 1 ? "" : createUpdate == 2 ? data : "")
    const [url, setUrl] = useState(createUpdate == 1 ? "https://img.freepik.com/free-icon/list_318-390195.jpg" : data.image)
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setDataBook1({ ...dataBook, [e.target.name]: value });
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
                    setDataBook1({ ...dataBook, image: url });
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
        <div className="modalBackgroundBook">
            <div className="modalContainerCate">
                {
                    createUpdate == 1 ?
                        <>
                            <div className="title">
                                Thêm thể loại mới
                            </div>
                            <div className="body">
                                <form>
                                    <div className='fieldInformation'>
                                        <div style={{ display: 'flex', flexDirection: "column" }}>
                                            <div style={{ marginTop: "10px" }}>
                                                <div>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        size='small'
                                                        id="outlined-required"
                                                        label="Tên thể loại"
                                                        name='name'
                                                        onChange={handleChange}
                                                        sx={{
                                                            '& > :not(style)': {},
                                                        }}
                                                    />
                                                </div>
                                            </div >
                                            <div className='bookImage'>
                                                <Avatar src={url} alt="" sx={{ width: 220, height: 220, marginTop: "10px", borderRadius: 0 }} />
                                                <input type="file" id='file' accept="image/png, image/jpg, image/jpeg" onChange={handleImageChange} style={{ display: 'none' }} />
                                                {/* <button onClick={handleUpload}>Xác nhận</button> */}
                                                <div className='fade'>
                                                </div>
                                                <label className='modify' htmlFor="file">
                                                    <ControlPointIcon style={{ fontSize: "50px" }} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="footer">
                                <button className="deleteButton"
                                    id='cancelBtn'
                                    onClick={() => {
                                        setOpenModal(false)
                                    }}>Đóng</button>
                                <button className="editButton"
                                    disabled={loading}
                                    onClick={async () => {
                                        setLoading(true)
                                        await createCate(dataBook, setNoti, setOpenModal)
                                        const bookList = await getListCate(setNoti)
                                        setDataBook(bookList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
                                        setLoading(false)
                                    }}>{
                                        loading ?
                                        <div className='Loader' />
                                        :
                                        <>Thêm mới</>
                                    }</button>

                            </div>
                        </>
                        :
                        createUpdate == 2 ?
                            <>
                                <div className="title">
                                    Thông tin thể loại
                                </div>
                                <div className="body">
                                    <form>
                                        <div className='fieldInformation'>
                                            <div style={{ display: 'flex', flexDirection: "column" }}>
                                                <div style={{ marginTop: "10px" }}>
                                                    <div>
                                                        <TextField
                                                            required
                                                            size='small'
                                                            id="outlined-required"
                                                            label="Tên thể loại"
                                                            name='name'
                                                            defaultValue={data.name}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div >
                                                <div className='bookImage'>
                                                    <Avatar src={url} alt="" sx={{ width: 220, height: 220, marginTop: "10px", borderRadius: 0 }} />
                                                    <input type="file" id='file' accept="image/png, image/jpg, image/jpeg" onChange={handleImageChange} style={{ display: 'none' }} />
                                                    {/* <button onClick={handleUpload}>Xác nhận</button> */}
                                                    <div className='fade'>
                                                    </div>
                                                    <label className='modify' htmlFor="file">
                                                        <ModeIcon />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="footer">
                                    <button className="deleteButton"
                                        id='cancelBtn'
                                        onClick={() => {
                                            setOpenModal(false)
                                        }}>Đóng</button>
                                    <button className="editButton"
                                    disabled={loading}
                                        onClick={async () => {
                                            setLoading(true)
                                            await updateCate(dataBook._id, dataBook, setNoti, setOpenModal)
                                            const bookList = await getListCate(setNoti)
                                            setDataBook(bookList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
                                            setLoading(false)
                                        }}>{
                                            loading ?
                                            <div className='Loader' />
                                            :
                                            <>Cập nhật</>
                                        }</button>

                                </div>
                            </>
                            :
                            <></>
                }
            </div>
        </div>
    )
}

export default PopupCate