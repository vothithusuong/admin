import React, { useState } from 'react'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import "./popupReturn.scss"
import { handleDelete, getListUser } from "../../../context/userContext/apiCalls"
import { returnBook, getUserReturnedBook, getUserConfirmBook, getUserCancelBook, getUserBorrowedBook, corfirmBook, borrowBookinDetail, getUserWaittoBorrowBook, cancelBook } from "../../../context/bookContext/apiCalls"
import { getUserCart, getStatsCartUser } from "../../../context/userContext/apiCalls"
import { TextField } from '@mui/material';


const PopupReturn = ({ nameBook,
    setOpenModal,
    data, setNotify,
    setDataUser,
    setUserCartItems,
    setDataConfirm,
    setDataWaitBorrow,
    setDataBorrow,
    setDataReturn,
    setDataCancel,
    setRecordCancel,
    setRecordDone,
    setRecordBorrowed,
    setRecordWaittoBorrow,
    setRecordWaitConfirm,
    setRecordAll,
    valueButton,
    amount,
    idBorrow }) => {
    const [dataPopup, setDataPopup] = useState({
        userBorrowInfo: setDataUser.userBorrowInfo._id,
        cartItems: [
            {
                bookId: data,
                amount: amount
            }
        ]
    })
    const [loading, setLoading] = useState(false);

    const changeValueAmount = (e) => {
        const newObj = JSON.parse(JSON.stringify(dataPopup))
        newObj.cartItems[0].amount = e.target.value;
        setDataPopup(newObj)
    }
    if (valueButton == 1) {
        return (
            <div className="modalBackgrounddd">
                <div className="modalContainerrr">
                    <div style={{ cursor: 'pointer', display: "flex", justifyContent: "end", fontSize: "20px" }}
                        onClick={() => {
                            setOpenModal(false)
                        }}>
                        x
                    </div>
                    <ExclamationCircleOutlined style={{ color: "rgba(68, 146, 64, 0.9)", fontSize: "30px" }} />
                    <div className="titlee">
                        Vui lòng điền số lượng duyệt <b>{nameBook}</b> cho <b>{setDataUser.userBorrowInfo.name}</b>
                    </div>
                    <div className="body">
                        <TextField
                            type="number"
                            size='small'
                            defaultValue={amount}
                            onChange={changeValueAmount}
                            style={{ width: "220px", marginTop: "10px" }}
                            InputProps={{ inputProps: { min: 0, max: amount, style: { textAlign: 'center' } } }}
                        ></TextField>
                    </div>

                    <div className="footerr">
                        <button
                            disabled={loading}
                            onClick={async () => {
                                setLoading(true)
                                await cancelBook(idBorrow, {
                                    userBorrowInfo: setDataUser.userBorrowInfo._id,
                                    cartItems: [
                                        {
                                            bookId: data,
                                            amount: amount
                                        }
                                    ]
                                }, setNotify, setOpenModal)
                                const userCart = await getUserCart(setDataUser.userBorrowInfo._id, setNotify)
                                setUserCartItems(userCart?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))
                                setRecordAll(userCart?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))

                                const userConfirm = await getUserConfirmBook(setDataUser.userBorrowInfo._id, setNotify)
                                setDataConfirm(userConfirm?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))
                                setRecordWaitConfirm(userConfirm?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))

                                const cancelList = await getUserCancelBook(setDataUser.userBorrowInfo._id, setNotify)
                                setDataCancel(cancelList?.data?.data.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))
                                setRecordCancel(cancelList?.data?.data.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))
                                setLoading(false)
                            }}
                            id="rejectBtn"
                        >
                            {
                                loading ?
                                    <div className='Loader' />
                                    :
                                    <>Từ chối</>
                            }
                        </button>
                        <button
                            disabled={loading}
                            onClick={async () => {
                                setLoading(true)
                                await corfirmBook(idBorrow, dataPopup, setNotify, setOpenModal)
                                const userCart = await getUserCart(setDataUser.userBorrowInfo._id, setNotify)
                                setUserCartItems(userCart?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))
                                setRecordAll(userCart?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))

                                const userConfirm = await getUserConfirmBook(setDataUser.userBorrowInfo._id, setNotify)
                                setDataConfirm(userConfirm?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))
                                setRecordWaitConfirm(userConfirm?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))

                                const userWaitBorrow = await getUserWaittoBorrowBook(setDataUser.userBorrowInfo._id, setNotify)
                                setDataWaitBorrow(userWaitBorrow?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))
                                setRecordWaittoBorrow(userWaitBorrow?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))

                                const cancelList = await getUserCancelBook(setDataUser.userBorrowInfo._id, setNotify)
                                setDataCancel(cancelList?.data?.data.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))
                                setRecordCancel(cancelList?.data?.data.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))
                                setLoading(false)
                            }}
                        >
                            {
                                loading ?
                                    <div className='Loader' />
                                    :
                                    <>Duyệt sách</>
                            }
                        </button>

                    </div>
                </div>
            </div>
        )
    }
    if (valueButton == 2) {
        return (
            <div className="modalBackgrounddd">
                <div className="modalContainerrr">
                    <ExclamationCircleOutlined style={{ color: "rgba(68, 146, 64, 0.9)", fontSize: "30px" }} />
                    <div className="titlee">
                        Vui lòng xác nhận số sách <b>{nameBook}</b> mà <b>{setDataUser.userBorrowInfo.name}</b> mượn!
                    </div>
                    <div className="body">
                        <TextField
                            type="number"
                            size='small'
                            defaultValue={amount}
                            onChange={changeValueAmount}
                            style={{ width: "220px", marginTop: "10px" }}
                            InputProps={{ inputProps: { min: 0, max: amount, style: { textAlign: 'center' } } }}
                        ></TextField>
                    </div>

                    <div className="footerr">
                        <button
                            onClick={() => {
                                setOpenModal(false)
                            }}
                            id="cancellBtn"
                        >
                            Đóng
                        </button>
                        <button
                            disabled={loading}
                            onClick={async () => {
                                setLoading(true)
                                await borrowBookinDetail(idBorrow, dataPopup, setNotify, setOpenModal)

                                const userCart = await getUserCart(setDataUser.userBorrowInfo._id, setNotify)
                                setUserCartItems(userCart?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))
                                setRecordAll(userCart?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))

                                const userBorrow = await getUserBorrowedBook(setDataUser.userBorrowInfo._id, setNotify)
                                setDataBorrow(userBorrow?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))
                                setRecordBorrowed(userBorrow?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))

                                const userWaitBorrow = await getUserWaittoBorrowBook(setDataUser.userBorrowInfo._id, setNotify)
                                setDataWaitBorrow(userWaitBorrow?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))
                                setRecordWaittoBorrow(userWaitBorrow?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))
                                setLoading(false)
                            }}
                        >
                            {
                                loading ?
                                    <div className='Loader' />
                                    :
                                    <>Xác nhận</>
                            }
                        </button>

                    </div>
                </div>
            </div>
        )
    }
    if (valueButton == 3) {
        return (
            <div className="modalBackgrounddd">
                <div className="modalContainerrr">
                    <ExclamationCircleOutlined style={{ color: "rgba(33, 182, 50, 0.9)", fontSize: "30px" }} />
                    <div className="titlee">
                        Vui lòng xác nhận số lượng sách <b>{nameBook}</b> đã được <b>{setDataUser.userBorrowInfo.name}</b> trả
                    </div>
                    <div className="body">
                        <TextField
                            type="number"
                            size='small'
                            defaultValue={amount}
                            onChange={changeValueAmount}
                            style={{ width: "220px", marginTop: "10px" }}
                            InputProps={{ inputProps: { min: 0, max: amount, style: { textAlign: 'center' } } }}
                        ></TextField>
                    </div>
                    <div className="footerr">
                        <button
                            onClick={() => {
                                setOpenModal(false)
                            }}
                            id="cancellBtn"
                        >
                            Đóng
                        </button>
                        <button
                            onClick={async () => {
                                await returnBook(idBorrow, dataPopup, setNotify, setOpenModal)
                                const userCart = await getUserCart(setDataUser.userBorrowInfo._id, setNotify)
                                setUserCartItems(userCart?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))
                                setRecordAll(userCart?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))

                                const userBorrow = await getUserBorrowedBook(setDataUser.userBorrowInfo._id, setNotify)
                                setDataBorrow(userBorrow?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))
                                setRecordBorrowed(userBorrow?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))

                                const returnList = await getUserReturnedBook(setDataUser.userBorrowInfo._id, setNotify)
                                setDataReturn(returnList?.data?.data.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))
                                setRecordDone(returnList?.data?.data.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))
                                //     setOpenModal(false)
                            }}
                        >
                            Xác nhận
                        </button>

                    </div>
                </div>
            </div>
        )
    }
}

export default PopupReturn