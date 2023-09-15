import React, { useState } from 'react'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import "./popupUpload.scss"
import { getListUser, importFileUser } from "../../../context/userContext/apiCalls"
import { getListBook, importFileBook } from "../../../context/bookContext/apiCalls"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const PopupUpload = ({ setOpenModal, isPopup, setNoti, setDataUser }) => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }

    return (
        <div className="modalBackgroundd">
            <div className="modalContainerUpload" style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <label htmlFor="uploadBtn">
                    <CloudUploadIcon className='iconUpload' />
                </label>
                <div className="titlee" >
                    {
                        selectedFile ?
                            <>
                                File đã chọn: {selectedFile.name}
                            </>
                            :
                            <>
                                Nhấn vào biểu tượng ở trên đển chọn file
                            </>
                    }

                    <input type="file" id="uploadBtn" style={{ display: 'none' }} onChange={handleFileSelect} />
                </div>

                <div className="footerUpload">
                    <button
                        onClick={() => {
                            setOpenModal(false)
                        }}
                        id="cancellBtn"
                    >
                        Đóng
                    </button>
                    {
                        isPopup == 1 ?
                            selectedFile ?
                                <button id="upBtn"
                                    disabled={loading}
                                    onClick={async () => {
                                        setLoading(true)
                                        await importFileUser(selectedFile, setNoti, setOpenModal)
                                        const userList = await getListUser(setNoti)
                                        setDataUser(userList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
                                        setLoading(false)
                                    }
                                    }>
                                    {
                                        loading ?
                                            <div className='Loader' />
                                            :
                                            <>Thêm</>
                                    }
                                </button>
                                :
                                <button id="blockBtn" disabled={true} onClick={async () => {
                                }
                                }>
                                    Chọn file để thêm
                                </button>
                            :
                            <></>
                    }
                    {
                        isPopup == 2 ?
                            selectedFile ?
                                <button id="upBtn" 
                                disabled={loading}
                                onClick={async () => {
                                    setLoading(true)
                                    await importFileBook(selectedFile, setNoti, setOpenModal)
                                    const bookList = await getListBook(setNoti)
                                    setDataUser(bookList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
                                    setLoading(false)
                                }
                                }>
                                    {
                                    loading ?
                                    <div className='Loader' />
                                    :
                                    <>Thêm</>
                                }
                                </button>
                                :
                                <button id="blockBtn" disabled={true} onClick={async () => {
                                }
                                }>
                                    Chọn file để thêm
                                </button>
                            :
                            <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default PopupUpload