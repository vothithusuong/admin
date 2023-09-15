import React, { useState, useEffect } from 'react'
import { TextField, Chip, Avatar } from "@mui/material";
import "./popupBook.scss"
import Autocomplete from '@mui/material/Autocomplete';
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createBook, getListBook, updateBook, inboundBook, liquidBook } from "../../../context/bookContext/apiCalls"
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ModeIcon from '@mui/icons-material/Mode';

const PopupBook = ({ choose, setOpenModal, createUpdate, category, data, setNoti, setDataBook }) => {

    const fixedOptions = [];
    const [dataBook, setDataBook1] = useState(createUpdate == 1 ? { categoryItems: [{ categoryId: category[0]._id }] } : createUpdate == 2 ? data : "")

    const [value2, setValue2] = useState(createUpdate == 1 ? [category[0]] : data?.categoryItems.map(item => item.categoryId))
    const [url, setUrl] = useState(createUpdate == 1 ? "https://firebasestorage.googleapis.com/v0/b/lib-lututrong.appspot.com/o/lib-lytutrong167903303218513352?alt=media&token=33928d40-207c-44d7-98cb-331e09e3e3ce" : data.image)
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
            <div className="modalContainerBook">
                {
                    createUpdate == 1 ?
                        <>
                            <div className="title">
                                Thêm đầu sách mới
                            </div>
                            <div className="body">
                                <form>
                                    <div className='fieldInformation'>
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ marginTop: "10px" }}>
                                                <div>
                                                    <TextField
                                                        required
                                                        size='small'
                                                        id="outlined-required"
                                                        label="Tên sách"
                                                        name='name'
                                                        onChange={handleChange}
                                                        sx={{
                                                            '& > :not(style)': { marginRight: "10px" },
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        size='small'
                                                        id="outlined-required"
                                                        label="Tác giả"
                                                        name='translator'
                                                        onChange={handleChange}
                                                        style={{ width: "137px" }}
                                                        sx={{
                                                            '& > :not(style)': { marginRight: "10px", marginTop: "10px" },
                                                        }}
                                                    />
                                                    <TextField
                                                        size='small'
                                                        id="outlined-required"
                                                        label="Khối"
                                                        name='grade'
                                                        type={"number"}
                                                        defaultValue={0}
                                                        InputProps={{ inputProps: { min: 0, max: 5 } }}
                                                        onChange={handleChange}
                                                        sx={{
                                                            '& > :not(style)': { marginRight: "10px", marginTop: "10px" },
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        required
                                                        size='small'
                                                        name='publicationdate'
                                                        id="outlined-required"
                                                        label="Năm xuất bản"
                                                        type={"number"}
                                                        defaultValue={0}
                                                        onChange={handleChange}
                                                        sx={{
                                                            '& > :not(style)': { marginRight: "10px", marginTop: "10px" },
                                                        }}
                                                    />
                                                </div>
                                            </div >
                                            <div className='bookImage'>
                                                <Avatar src={url} alt="" sx={{ width: 90, height: 135, marginTop: "10px", borderRadius: 0 }} />
                                                <input type="file" id='file' accept="image/png, image/jpg, image/jpeg" onChange={handleImageChange} style={{ display: 'none' }} />
                                                {/* <button onClick={handleUpload}>Xác nhận</button> */}
                                                <div className='fade'>
                                                </div>
                                                <label className='modify' htmlFor="file">
                                                    <ControlPointIcon />
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <TextField
                                                required
                                                size='small'
                                                name='price'
                                                id="outlined-required"
                                                label="Đơn giá"
                                                type={"number"}
                                                defaultValue={0}
                                                onChange={handleChange}
                                                sx={{
                                                    '& > :not(style)': { marginTop: "10px" },
                                                }}
                                            />
                                            <TextField
                                                required
                                                size='small'
                                                name='stock'
                                                id="outlined-required"
                                                label="Số lượng"
                                                type={"number"}
                                                defaultValue={0}
                                                onChange={handleChange}
                                                sx={{
                                                    '& > :not(style)': { marginLeft: "10px", marginTop: "10px" },
                                                }}
                                            />
                                        </div>
                                    </div>
                                </form>
                                <div className='autoimage'>
                                    {
                                        category ?
                                            <Autocomplete
                                                multiple={true}
                                                id={category._id}
                                                value={value2}
                                                sx={{ marginTop: "10px" }}
                                                onChange={(event, newValue) => {
                                                    setValue2([...newValue.filter((option) => fixedOptions.indexOf(option) === -1)])
                                                    setDataBook1({ ...dataBook, categoryItems: newValue.map(items => { return { categoryId: items._id } }) });

                                                }}
                                                options={category.length > 0 ? category : null}
                                                getOptionLabel={(option) => option.name}
                                                renderTags={(tagValue, getTagPros) =>
                                                    tagValue.map((option, i) => (
                                                        <Chip
                                                            key={option._id}
                                                            label={option.name}
                                                            {...getTagPros({ i })}
                                                        /* disabled={fixedOptions.indexOf(option) !== -1} */
                                                        />
                                                    ))
                                                }

                                                fullWidth
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Loại sách" variant="outlined" />
                                                )}
                                            />
                                            :
                                            <></>
                                    }

                                </div>

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
                                        await createBook(dataBook, setNoti, setOpenModal)
                                        const bookList = await getListBook(choose, setNoti)
                                        setDataBook(bookList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
                                        setLoading(false)
                                    }}>
                                    {
                                        loading ?
                                            <div className='Loader' />
                                            :
                                            <>Thêm mới</>
                                    }
                                </button>

                            </div>
                        </>
                        :
                        createUpdate == 2 ?
                            <>
                                <div className="title">
                                    Thông tin đầu sách
                                </div>
                                <div className="body">
                                    <form>
                                        <div className='fieldInformation'>
                                            <div style={{ display: 'flex' }}>
                                                <div style={{ marginTop: "10px" }}>
                                                    <div>
                                                        <TextField
                                                            required
                                                            size='small'
                                                            id="outlined-required"
                                                            label="Tên đầu sách"
                                                            name='name'
                                                            defaultValue={data.name}
                                                            onChange={handleChange}
                                                            sx={{
                                                                '& > :not(style)': { marginRight: "10px" },
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <TextField
                                                            required
                                                            size='small'
                                                            id="outlined-required"
                                                            label="Tác giả"
                                                            name='translator'
                                                            style={{ width: "137px" }}
                                                            defaultValue={data.translator}
                                                            onChange={handleChange}
                                                            sx={{
                                                                '& > :not(style)': { marginRight: "10px", marginTop: "10px" },
                                                            }}
                                                        />
                                                        <TextField
                                                            size='small'
                                                            id="outlined-required"
                                                            label="Khối"
                                                            name='grade'
                                                            type={"number"}
                                                            defaultValue={data.grade}
                                                            InputProps={{ inputProps: { min: 0, max: 5 } }}
                                                            onChange={handleChange}
                                                            sx={{
                                                                '& > :not(style)': { marginRight: "10px", marginTop: "10px" },
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <TextField
                                                            required
                                                            size='small'
                                                            name='publicationdate'
                                                            id="outlined-required"
                                                            label="Năm xuất bản"
                                                            type={"number"}
                                                            defaultValue={data.publicationdate}
                                                            onChange={handleChange}
                                                            sx={{
                                                                '& > :not(style)': { marginRight: "10px", marginTop: "10px" },

                                                            }}
                                                        />
                                                    </div>
                                                </div >
                                                <div className='bookImage'>
                                                    <Avatar src={url} alt="" sx={{ width: 90, height: 135, marginTop: "10px", borderRadius: 0 }} />
                                                    <input type="file" id='file' accept="image/png, image/jpg, image/jpeg" onChange={handleImageChange} style={{ display: 'none' }} />
                                                    {/* <button onClick={handleUpload}>Xác nhận</button> */}
                                                    <div className='fade'>
                                                    </div>
                                                    <label className='modify' htmlFor="file">
                                                        <ModeIcon />
                                                    </label>
                                                </div>
                                            </div>

                                            <div>
                                                <TextField
                                                    required
                                                    size='small'
                                                    name='price'
                                                    id="outlined-required"
                                                    label="Đơn giá"
                                                    type={"number"}
                                                    defaultValue={data.price}
                                                    onChange={handleChange}
                                                    sx={{
                                                        '& > :not(style)': { marginTop: "10px", marginRight: "10px", },
                                                    }}
                                                />
                                                <TextField
                                                    required
                                                    size='small'
                                                    name='stock'
                                                    id="outlined-required"
                                                    label="Vật lý"
                                                    type={"number"}
                                                    defaultValue={data.stock}
                                                    onChange={handleChange}
                                                    sx={{
                                                        '& > :not(style)': { marginTop: "10px" },
                                                    }}
                                                />
                                            </div>
                                            <div>

                                                <TextField
                                                    required
                                                    size='small'
                                                    name='authStock'
                                                    id="outlined-required"
                                                    label="Khả dụng"
                                                    type={"number"}
                                                    defaultValue={data.authStock}
                                                    onChange={handleChange}
                                                    sx={{
                                                        '& > :not(style)': { marginRight: "10px", marginTop: "10px" },
                                                    }}
                                                />

                                                <TextField
                                                    required
                                                    size='small'
                                                    name='liquid'
                                                    id="outlined-required"
                                                    label="Thanh lý"
                                                    type={"number"}
                                                    defaultValue={data.liquid}
                                                    onChange={handleChange}
                                                    sx={{
                                                        '& > :not(style)': { marginTop: "10px" },
                                                    }}
                                                />

                                            </div>

                                            {
                                                category ?
                                                    <Autocomplete
                                                        multiple={true}
                                                        id={category._id}
                                                        value={value2}
                                                        sx={{ marginTop: "10px" }}
                                                        onChange={(event, newValue) => {
                                                            setValue2([...newValue.filter((option) => fixedOptions.indexOf(option) === -1)])
                                                            setDataBook1({ ...dataBook, categoryItems: newValue.map(items => { return { categoryId: items._id } }) });

                                                        }}
                                                        options={category.length > 0 ? category : null}
                                                        getOptionLabel={(option) => option.name}
                                                        renderTags={(tagValue, getTagPros) =>
                                                            tagValue.map((option, i) => (
                                                                <Chip
                                                                    key={option._id}
                                                                    label={option.name}
                                                                    {...getTagPros({ i })}
                                                                /* disabled={fixedOptions.indexOf(option) !== -1} */
                                                                />
                                                            ))
                                                        }
                                                        renderInput={(params) => (
                                                            <TextField {...params} label="Loại sách" variant="outlined" />
                                                        )}
                                                    />
                                                    :
                                                    <></>
                                            }
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
                                            await updateBook(data._id, dataBook, setNoti, setOpenModal)
                                            const bookList = await getListBook(choose, setNoti)
                                            setDataBook(bookList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
                                            setLoading(false)
                                        }}>
                                        {
                                            loading ?
                                                <div className='Loader' />
                                                :
                                                <>Cập nhật</>
                                        }
                                    </button>

                                </div>
                            </>
                            :
                            createUpdate == 3 ?
                                <>
                                    <div className="title">
                                        Nhập sách vào thư viện
                                    </div>
                                    <div className="bodystock">
                                        <Avatar src={url} alt="" sx={{ width: 150, height: 200, borderRadius: 2 }} />
                                        <form style={{ marginLeft: "10px" }}>
                                            <div className='fieldInfor'>
                                                <h2>{data.name} - {data.translator}</h2>
                                                <TextField
                                                    required
                                                    size='small'
                                                    name='stock'
                                                    sx={{ marginTop: "10px" }}
                                                    id="outlined-required"
                                                    label="Số lượng sách nhập"
                                                    type="number"
                                                    // defaultValue={0}
                                                    onChange={handleChange}
                                                />
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
                                                await inboundBook(data._id, dataBook, setNoti, setOpenModal)
                                                const bookList = await getListBook(choose, setNoti)
                                                setDataBook(bookList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
                                                setLoading(false)
                                            }}>
                                            {
                                                loading ?
                                                    <div className='Loader' />
                                                    :
                                                    <>Xác nhận</>
                                            }
                                        </button>

                                    </div>
                                </>
                                :
                                <>
                                    <div className="title">
                                        Thanh lý sách
                                    </div>
                                    <div className="bodystock">
                                        <Avatar src={url} alt="" sx={{ width: 150, height: 200, borderRadius: 2 }} />
                                        <form style={{ marginLeft: "10px" }}>
                                            <div className='fieldInfor'>
                                                <h2>{data.name} - {data.translator}</h2>
                                                <TextField
                                                    required
                                                    size='small'
                                                    name='stock'
                                                    sx={{ marginTop: "10px" }}
                                                    id="outlined-required"
                                                    label="Số lượng thanh lý"
                                                    type="number"
                                                    // defaultValue={0}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="footer">
                                        <button className="deleteButton"
                                            id='cancelBtn'
                                            onClick={() => {
                                                setOpenModal(false)
                                            }}>Đóng</button>
                                        <button className="liquidButton"
                                            disabled={loading}
                                            onClick={async () => {
                                                setLoading(true)
                                                await liquidBook(data._id, dataBook, setNoti, setOpenModal)
                                                const bookList = await getListBook(choose, setNoti)
                                                setDataBook(bookList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
                                                setLoading(false)
                                            }}>
                                            {
                                                loading ?
                                                    <div className='Loader' />
                                                    :
                                                    <>Thanh lý</>
                                            }
                                        </button>

                                    </div>
                                </>
                }
            </div>
        </div>
    )
}

export default PopupBook