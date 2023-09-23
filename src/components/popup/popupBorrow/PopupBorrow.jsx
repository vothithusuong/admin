import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import "./popupBorrow.scss"
import { getallStockBook, getBorrowedBook, getCartAdmin, borrowBook } from "../../../context/bookContext/apiCalls"
import { getListUser } from "../../../context/userContext/apiCalls"
import { Add, Remove } from "@material-ui/icons";
import LoadingCircle from '../../loadingCircle/LoadingCircle';
import { Avatar, TextField, Autocomplete, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


const PopupBorrow = ({ setOpenModal, setNoti, setDataUser, setDataCart }) => {

    const [book, setBook] = useState("")
    const [user, setUser] = useState("")
    const [data, setData] = useState({ cartItems: [] })
    const [url, setUrl] = useState(null)
    const [record, setRecord] = useState("")
    const [loading, setLoading] = useState(false);

    const handleChangeAutoComplete = (e, value) => {
        setData({ ...data, userBorrowInfo: value._id });
        setUrl(value.image)
    };

    const handleSearch = (e) => {
        const newData = book.filter(row => {
            return row.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecord(newData)
    }
    useEffect(() => {
        (async () => {
            const bookList = await getallStockBook(setNoti)
            setBook(bookList?.data?.data.map((item, index, amount) => ({ ...item, index: index + 1, amount: 0 })))
            setRecord(bookList?.data?.data.map((item, index, amount) => ({ ...item, index: index + 1, amount: 0 })))
            const userList = await getListUser(setNoti)
            setUser(userList?.data?.data.map((item) => ({ ...item, label: item.name })))
        })()
        return;
    }, [])
    const handleQuantity = (type, id) => {
        if (type === 'dec') {
            const clone = JSON.parse(JSON.stringify(record))
            for (let i = 0; i < clone?.length; i++) {
                if (clone[i]?._id == id) {
                    if (clone[i].amount == 0) {
                        setNoti({
                            isOpen: true,
                            message: "Không thể giảm thành 0",
                            type: "error",
                        })
                    }
                    if (clone[i].amount > 0 && clone[i].amount <= clone[i].authStock) {
                        clone[i].amount = clone[i].amount - 1
                    }
                }
            }
            setRecord(clone)
        }
        if (type === 'asc') {
            const clone = JSON.parse(JSON.stringify(record))
            for (let i = 0; i < clone?.length; i++) {
                if (clone[i]._id == id) {
                    if (clone[i].amount == clone[i].authStock) {
                        setNoti({
                            isOpen: true,
                            message: "Không thể vượt quá số lượng tối đa",
                            type: "error",
                        })
                    }
                    if (clone[i].amount >= 0 && clone[i].amount < clone[i].authStock) {
                        clone[i].amount = clone[i].amount + 1
                    }
                }
            }
            setRecord(clone)
        }
    }

    const handleQuantityAdded = (type, id) => {
        if (type === 'dec') {
            const clone = JSON.parse(JSON.stringify(data))
            for (let i = 0; i < clone.cartItems.length; i++) {
                if (clone.cartItems[i]?.bookId == id) {
                    if (clone.cartItems[i].amount == 1) {
                        setNoti({
                            isOpen: true,
                            message: "Không thể giảm thành 0",
                            type: "error",
                        })
                    }
                    else if (clone.cartItems[i].amount > 0 && clone.cartItems[i].amount <= clone.cartItems[i].authStock) {
                        clone.cartItems[i].amount = clone.cartItems[i].amount - 1
                    }
                }
            }
            setData(clone)
        }
        if (type === 'asc') {
            const clone = JSON.parse(JSON.stringify(data))
            for (let i = 0; i < clone.cartItems.length; i++) {
                if (clone.cartItems[i].bookId == id) {
                    if (clone.cartItems[i].amount == clone.cartItems[i].authStock) {
                        setNoti({
                            isOpen: true,
                            message: "Không thể vượt quá số lượng tối đa",
                            type: "error",
                        })
                    }
                    if (clone.cartItems[i].amount >= 0 && clone.cartItems[i].amount < clone.cartItems[i].authStock) {
                        clone.cartItems[i].amount = clone.cartItems[i].amount + 1
                    }
                }
            }
            setData(clone)
        }
    }

    const addedColumns = [
        {
            field: "name",
            headerName: "Tên sách",
            width: 295,
            headerAlign: "center",
            renderCell: (params) => {
                return (

                    <div className="cellWithImg">
                        <Tooltip title={<><img src={params.row.image} alt="" style={{ width: "300px", height: "300px", objectFit: "contain" }} /></>} placement='right' arrow>
                            <img className="cellImg" src={params.row.image} alt="avatar" />
                        </Tooltip>
                        <Tooltip title={params.row.name}>
                            <div>
                                {params.row.name}
                            </div>
                        </Tooltip>
                    </div>
                );
            }
        },
        {
            field: "amount",
            headerName: "Số lượng",
            width: 100,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return (
                    <>
                        <Remove style={{ cursor: "pointer" }}
                            onClick={() => handleQuantityAdded("dec", params.row.bookId)}
                        />
                        <input type="number" step="1" min="0" max={params.row.authStock} value={params.row.amount} className="quantity" />
                        <Add style={{ cursor: "pointer" }}
                            onClick={() => handleQuantityAdded("asc", params.row.bookId)}
                        />
                    </>
                );
            }
        },
    ];

    const bookColumns = [
        {
            field: "index", headerName: "STT", width: 60, align: "center"
        },
        {
            field: "name",
            headerName: "Tên sách",
            width: 400,
            renderCell: (params) => {
                return (

                    <div className="cellWithImg">
                        <Tooltip title={<><img src={params.row.image} alt="" style={{ width: "300px", height: "300px", objectFit: "contain" }} /></>} placement='right' arrow>
                            <img className="cellImg" src={params.row.image} alt="avatar" />
                        </Tooltip>
                        <Tooltip title={params.row.name}>
                            <div>
                                {params.row.name}
                            </div>
                        </Tooltip>
                    </div>
                );
            }
        },

        // {
        //     field: "issuingcompany",
        //     headerName: "NXB",
        //     width: 150,
        // },
        {
            field: "authStock",
            headerName: "Tồn",
            width: 100,
            align: "center",
            headerAlign: "center",

        },
        {
            field: "auth",
            headerName: "Số lượng",
            width: 100,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return (
                    <>
                        <Remove style={{ cursor: "pointer" }}
                            onClick={() => handleQuantity("dec", params.row._id)}
                        />
                        <input type="number" step="1" min="0" max={params.row.authStock} defaultValue={params.row.amount} value={params.row.amount} className="quantity" />
                        <Add style={{ cursor: "pointer" }}
                            onClick={() => handleQuantity("asc", params.row._id)}
                        />
                    </>
                );
            }
        },
    ];
    const actionColumn = [
        {
            field: "action",
            headerName: "Thao tác",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="cellAction" key={params.row._id}>

                        <div className="addButton"
                            onClick={() => {
                                const dataBorrow = JSON.parse(JSON.stringify(data))
                                if (params.row.amount == 0) {
                                    setNoti({
                                        isOpen: true,
                                        message: "Không thể thêm số lượng sách là 0",
                                        type: "error",
                                    })
                                }
                                else {
                                    const index = dataBorrow.cartItems.findIndex(item => item?.bookId == params.row._id)
                                    if (index !== -1) {
                                        const allAmount = dataBorrow.cartItems[index].amount + params.row.amount;
                                        if (allAmount > params.row.authStock) {
                                            setNoti({
                                                isOpen: true,
                                                message: "Vượt quá số lượng cho phép!",
                                                type: "error",
                                            })
                                        }
                                        else {
                                            dataBorrow.cartItems[index].amount = allAmount;
                                            setData(dataBorrow)
                                        }
                                    }
                                    if (index == -1) {
                                        dataBorrow.cartItems.push({ bookId: params.row._id, name: params.row.name, image: params.row.image, amount: params.row.amount, authStock: params.row.authStock });
                                        setData(dataBorrow);
                                    }
                                }

                            }}
                        >
                            Thêm
                        </div>
                    </div>
                );
            },
            headerAlign: "center",
            align: "center"
        },
    ];

    const actionremoveColumn = [
        {
            field: "action",
            headerName: "Thao tác",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="cellAction" key={params.row.bookId}>
                        <div className="removeButton"
                            onClick={() => {
                                if (data?.cartItems) {
                                    const dataBorrow = JSON.parse(JSON.stringify(data))
                                    const index = dataBorrow?.cartItems?.findIndex(item => item?.bookId == params.row.bookId)
                                    if (index !== -1) {
                                        dataBorrow?.cartItems.splice(index, 1)
                                        setData(dataBorrow)
                                    }
                                }
                            }}
                        >
                            Hủy
                        </div>
                    </div>
                );
            },
            headerAlign: "center",
            align: "center"
        },
    ];

    return (
        <div className="modalBackgroundd">
            <div className="modalContainer">
                <div className="title">
                    Thêm phiên mượn mới
                </div>

                <div className="body">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {
                            user ?
                                <Autocomplete
                                    key={user._id}
                                    disablePortal
                                    id={user._id}
                                    options={user}
                                    sx={{ width: 300 }}
                                    onChange={handleChangeAutoComplete}
                                    renderInput={(params) => <TextField {...params} label="Giáo viên" />}
                                />
                                :
                                <></>
                        }

                        <Avatar src={url} alt="" sx={{ width: 80, height: 80 }} />
                        <FormControl sx={{ marginRight: "10px", width: 300 }}
                            variant="outlined"
                            id="outlined-required"
                            onChange={handleSearch}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">Tìm kiếm tên đầu sách</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            edge="end"
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Tìm kiếm tên đầu sách"
                            />
                        </FormControl>
                    </div>
                    <form>
                        <div className='fieldInfor'>
                            {
                                record ?
                                    <DataGrid
                                        className="datagrid"
                                        rows={record}
                                        sx={{ height: '300px', marginTop: "10px" }}
                                        columns={bookColumns.concat(actionColumn)}
                                        getRowId={(book) => book._id}
                                        pageSize={3}
                                        rowsPerPageOptions={[3]}
                                        disableSelectionOnClick
                                        disableColumnMenu
                                    />
                                    :
                                    <LoadingCircle />
                            }
                        </div>
                    </form>
                    <div className="footerBorrow">
                        <button className="confirmBorrow"
                            onClick={() => {
                                setOpenModal(false)
                            }}
                            id="cancelBtn">
                            Đóng
                        </button>
                        <button className="confirmBorrow" disabled={loading}
                            onClick={async () => {
                                setLoading(true);
                                await borrowBook(data, setNoti, setOpenModal)
                                const userList = await getBorrowedBook(setNoti)
                                setDataUser(userList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
                                const cartList = await getCartAdmin(setNoti)
                                setDataCart(cartList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
                                setLoading(false);

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
            <div className='modalAdded'>
                <div className="title">
                    Sách đã thêm
                </div>
                <DataGrid
                    className="datagrid"
                    rows={data.cartItems}
                    sx={{ height: '300px', marginTop: "10px" }}
                    columns={addedColumns.concat(actionremoveColumn)}
                    getRowId={(book) => book.bookId}
                    pageSize={6}
                    rowsPerPageOptions={[6]}
                    disableSelectionOnClick
                    disableColumnMenu
                />
            </div>
        </div>
    )
}

export default PopupBorrow