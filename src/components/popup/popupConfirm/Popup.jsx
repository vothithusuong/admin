import React, { useState } from 'react'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import "./popup.scss"
import { handleDelete, getListUser } from "../../../context/userContext/apiCalls"
import { handleDeleteBook, getListBook } from "../../../context/bookContext/apiCalls"
import { handleDeleteCate, getListCate } from "../../../context/cateContext/apiCalls"
import { handleDeleteBanner, getListBanner } from "../../../context/bannerContext/apiCalls"


const Popup = ({ setOpenModal, title, data, isPopup, setNoti, setDataUser }) => {
    const [loading, setLoading] = useState(false);
    return (
        <div className="modalBackgroundd">
            <div className="modalContainerr">
                <ExclamationCircleOutlined style={{ color: "rgba(220, 20, 60, 0.9)", fontSize: "30px" }} />
                <div className="titlee">
                    {title}
                </div>
                {/* <div className="body">
          <p>Nếu </p>
        </div> */}
                <div className="footerr">
                    <button
                        onClick={() => {
                            setOpenModal(false)
                        }}
                        id="cancellBtn"
                    >
                        Đóng
                    </button>
                    {
                        isPopup == 2 ?
                            <button
                                disabled={loading}
                                onClick={async () => {
                                    setLoading(true)
                                    await handleDelete(data, setNoti)
                                    const userList = await getListUser(setNoti)
                                    setDataUser(userList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
                                    setLoading(false)
                                    setOpenModal(false)
                                }
                                }>
                                {
                                    loading ?
                                        <div className='Loader' />
                                        :
                                        <>Xóa</>
                                }
                            </button>
                            :
                            isPopup == 1 ?
                                <button
                                    disabled={loading}
                                    onClick={async () => {
                                        setLoading(true)
                                        await handleDeleteBook(data, setNoti)
                                        const bookList = await getListBook(1, setNoti)
                                        setDataUser(bookList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
                                        setLoading(false)
                                        setOpenModal(false) 
                                    }
                                    }>
                                    {
                                        loading ?
                                            <div className='Loader' />
                                            :
                                            <>Xóa</>
                                    }
                                </button> :
                                isPopup == 3 ?
                                    <button
                                        disabled={loading}
                                        onClick={async () => {
                                            setLoading(true)
                                            await handleDeleteCate(data, setNoti)
                                            const cateList = await getListCate(setNoti)
                                            setDataUser(cateList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
                                            setLoading(false)
                                            setOpenModal(false)
                                        }
                                        }>
                                        {
                                            loading ?
                                                <div className='Loader' />
                                                :
                                                <>Xóa</>
                                        }
                                    </button> :
                                    isPopup == 4 ?
                                        <button
                                            disabled={loading}
                                            onClick={async () => {
                                                setLoading(true)
                                                await handleDeleteBanner(data, setNoti)
                                                const bannerList = await getListBanner(setNoti)
                                                setDataUser(bannerList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
                                                setLoading(false)
                                                setOpenModal(false)
                                            }
                                            }>
                                            {
                                                loading ?
                                                    <div className='Loader' />
                                                    :
                                                    <>Xóa</>
                                            }
                                        </button>
                                        :
                                        <></>
                    }

                </div>
            </div>
        </div>
    )
}

export default Popup