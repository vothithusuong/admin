import React, { useState, useEffect } from 'react'
import { TextField, Chip, Avatar } from "@mui/material";
import "./popupBanner.scss"
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getListBanner, createBanner, updateBanner } from "../../../context/bannerContext/apiCalls"
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ModeIcon from '@mui/icons-material/Mode';

const PopupBanner = ({ setOpenModal, createUpdate, category, data, setNoti, setDataBook }) => {
    const [dataBook, setDataBook1] = useState(createUpdate == 1 ? "" : createUpdate == 2 ? data : "")
    const [url, setUrl] = useState(createUpdate == 1 ? "https://content.fortune.com/wp-content/uploads/2019/04/brb05.19.plus_.jpg" : data.image)
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
                            <div className="titleBanner">
                                Thêm banner mới
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
                                                        label="Tên banner"
                                                        name='name'
                                                        onChange={handleChange}
                                                        sx={{
                                                            '& > :not(style)': {},
                                                        }}
                                                    />
                                                    <TextField
                                                        required
                                                        size='small'
                                                        id="outlined-required"
                                                        label="Đường dẫn"
                                                        name='link'
                                                        onChange={handleChange}
                                                        sx={{
                                                            '& > :not(style)': { marginLeft: "10px" },
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        size='small'
                                                        type="text"
                                                        multiline
                                                        id="outlined-required"
                                                        label="Mô tả"
                                                        name='description'
                                                        onChange={handleChange}
                                                        inputProps={{ maxLength: 200 }}
                                                        sx={{
                                                            '& > :not(style)': { marginTop: "10px" },
                                                        }}
                                                    />
                                                </div>
                                                <div style={{ display: "flex", justifyContent: "right", alignItems: "right" }}>
                                                    {dataBook?.description ? dataBook.description.length : 0}/200
                                                </div>
                                            </div >
                                            <div className='bannerImage'>
                                                <Avatar src={url} alt="" sx={{ width: 455, height: 220, borderRadius: 0 }} />
                                                <input type="file" id='file' accept="image/png, image/jpg, image/jpeg" onChange={handleImageChange} style={{ display: 'none' }} />
                                                {/* <button onClick={handleUpload}>Xác nhận</button> */}
                                                <div className='faded'>
                                                </div>
                                                <label className='modify' htmlFor="file">
                                                    <ControlPointIcon style={{ fontSize: "50px" }} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="footerBanner">
                                <button className="deleteButton"
                                    id='cancelBtn'
                                    onClick={() => {
                                        setOpenModal(false)
                                    }}>Đóng</button>
                                <button className="editButton"
                                    disabled={loading}
                                    onClick={async () => {
                                        setLoading(true)
                                        await createBanner(dataBook, setNoti, setOpenModal)
                                        const bannerList = await getListBanner(setNoti)
                                        setDataBook(bannerList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
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
                                    Thông tin banner
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
                                                            label="Tên banner"
                                                            name='name'
                                                            defaultValue={data.name}
                                                            onChange={handleChange}
                                                        />
                                                        <TextField
                                                            required
                                                            size='small'
                                                            id="outlined-required"
                                                            label="Đường dẫn"
                                                            name='link'
                                                            defaultValue={data.link}
                                                            onChange={handleChange}
                                                            sx={{
                                                                '& > :not(style)': { marginLeft: "10px" },
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <TextField
                                                            required
                                                            fullWidth
                                                            size='small'
                                                            type="text"
                                                            multiline
                                                            id="outlined-required"
                                                            label="Mô tả"
                                                            name='description'
                                                            defaultValue={data.description}
                                                            onChange={handleChange}
                                                            inputProps={{ maxLength: 200 }}
                                                            sx={{
                                                                '& > :not(style)': { marginTop: "10px" },
                                                            }}
                                                        />
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "right", alignItems: "right" }}>
                                                        {dataBook?.description ? dataBook.description.length : 0}/200
                                                    </div>
                                                </div >
                                                <div className='bannerImage'>
                                                    <Avatar src={url} alt="" sx={{ width: 455, height: 220, borderRadius: 0 }} />
                                                    <input type="file" id='file' accept="image/png, image/jpg, image/jpeg" onChange={handleImageChange} style={{ display: 'none' }} />
                                                    {/* <button onClick={handleUpload}>Xác nhận</button> */}
                                                    <div className='faded'>
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
                                            await updateBanner(dataBook._id, dataBook, setNoti, setOpenModal)
                                            const bookList = await getListBanner(setNoti)
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

export default PopupBanner