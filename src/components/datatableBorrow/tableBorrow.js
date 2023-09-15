import Moment from 'moment';
import { Chip, Avatar, Tooltip, Tab, Tabs } from "@mui/material";

export const userColumns = [
    {
        field: "index", headerName: "STT", width: 60, align: "center"
    },
    { field: "_id", headerName: "Mã phiên", width: 100 },
    {
        field: "name",
        headerName: "Người mượn",
        width: 250,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.userBorrowInfo.image} alt="avatar" />
                    {params.row.userBorrowInfo.name}
                </div>
            );
        }
    },
    {
        field: "cartItems",
        headerName: "Số đầu sách",
        width: 250,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    {params.row.cartItems.length}
                </div>
            );
        }
    },
    
    // {
    //     field: "cartItems",
    //     headerName: "Sách đang mượn",
    //     width: 400,
    //     renderCell: (params) => {
    //         return params.row.cartItems.map(option => {

    //             if (new Date(option.exp).getTime() < new Date().getTime()) {
    //                 const title = `Quá hạn trả sách ${(new Date((new Date() - new Date(option.exp))) / (1000 * 3600 * 24)).toFixed(0)} ngày`
    //                 return (
    //                     <Tooltip key={option.bookId._id} title={title} arrow>
    //                         <Chip
    //                             key={option.bookId._id}
    //                             label={option.bookId.name}
    //                             color="error"
    //                             style={{ marginRight: 5 }}
    //                         ></Chip>
    //                     </Tooltip>
    //                 );
    //             }
    //             else if (new Date(option.exp).getTime() < new Date().getTime() + 30 * 24 * 60 * 60 * 1000) {
    //                 const title = `Còn ${(new Date((new Date().getTime() + 30 * 24 * 60 * 60 * 1000 - new Date(option.exp).getTime())) / (1000 * 3600 * 24)).toFixed(0)} ngày đến hạn trả sách`
    //                 return (
    //                     <Tooltip key={option.bookId._id} title={title} arrow>
    //                         <Chip
    //                             key={option.bookId._id}
    //                             label={option.bookId.name}
    //                             color="warning"
    //                             style={{ marginRight: 5 }}
    //                         ></Chip>
    //                     </Tooltip>

    //                 );
    //             }
    //             else {
    //                 const title = `Sách được mượn vào: ${Moment(option.timeBorrow).format('HH:mm:ss, DD/MM/YYYY')}`
    //                 return (
    //                     <Tooltip key={option.bookId._id} title={title} arrow>
    //                         <Chip
    //                             key={option.bookId._id}
    //                             label={option.bookId.name}
    //                             color="primary"
    //                             style={{ marginRight: 5 }}
    //                         ></Chip>
    //                     </Tooltip>
    //                 );
    //             }


    //         })
    //     },
    // },
    {
        field: "cartItems.bookId.price",
        headerName: "Tổng giá tiền",
        align: 'center',
        headerAlign: 'center',
        width: 180,
        renderCell: (params) => {
            let price = 0
            params.row.cartItems.map(options => {
                price = price + parseInt(options.bookId.price, 10)

            })
            price = price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
            return price
        },
    },
    {
        field: "updatedAt",
        headerName: "Thời gian cập nhật",
        width: 180,
        renderCell: (params) => {
            return (
                Moment(params.row.updatedAt).format('HH:mm:ss, DD/MM/YYYY')
            )
        }
    },
];


export const allColumns = [
    {
        field: "index", headerName: "STT", width: 60, align: "center"
    },
    // { field: "_id", headerName: "Mã phiên", width: 100 },
    {
        field: "name",
        headerName: "Người mượn",
        width: 250,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.userBorrowInfo.image} alt="avatar" />
                    {params.row.userBorrowInfo.name}
                </div>
            );
        }
    },
    {
        field: "cartItems.length",
        headerName: "Số phiên mượn",
        align: "center",
        width: 150,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    {params.row.cartItems.length}
                </div>
            );
        }
    },
    {
        field: "cartItems.bookId",
        headerName: "Số sách mượn",
        align: "center",
        width: 130,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    {params.row.cartItems.reduce((pre, cur) => { return pre + cur.amount }, 0)}
                </div>
            );
        }
    },
    {
        field: "cartItems.bookId.price",
        headerName: "Tổng giá tiền",
        align: 'center',
        headerAlign: 'center',
        width: 180,
        renderCell: (params) => {
            let price = 0
            params.row.cartItems.map(options => {
                price = price + (parseInt(options.bookId.price, 10)* options.amount)

            })
            price = price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
            return price
        },
    },
    {
        field: "updatedAt",
        headerName: "Thời gian cập nhật",
        width: 180,
        renderCell: (params) => {
            return (
                Moment(params.row.updatedAt).format('HH:mm:ss, DD/MM/YYYY')
            )
        }
    },
];


export const returnColumns = [
    {
        field: "index", headerName: "STT", width: 60, align: "center"
    },
    { field: "_id", headerName: "Mã phiên", width: 100 },
    {
        field: "name",
        headerName: "Người mượn",
        width: 250,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.userBorrowInfo.image} alt="avatar" />
                    {params.row.userBorrowInfo.name}
                </div>
            );
        }
    },
    
    {
        field: "cartItems",
        headerName: "Sách đã trả",
        width: 400,
        renderCell: (params) => {
            return params.row.cartItems.map(option => {
                const title = `Sách được trả vào ${Moment(option.timeReturn).format('HH:mm:ss, DD/MM/YYYY')}`
                return (
                    <Tooltip key={option.bookId._id} title={title} arrow>
                        <Chip
                            key={option.bookId._id}
                            label={option.bookId.name}
                            color="success"
                            style={{ marginRight: 5 }}
                        ></Chip>
                    </Tooltip>
                );
            })
        },
    },
    {
        field: "cartItems.bookId.price",
        headerName: "Tổng giá tiền",
        align: 'center',
        headerAlign: 'center',
        width: 180,
        renderCell: (params) => {
            let price = 0
            params.row.cartItems.map(options => {
                price = price + parseInt(options.bookId.price, 10)

            })
            price = price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
            return price
        },
    },
    {
        field: "updatedAt",
        headerName: "Thời gian cập nhật",
        width: 180,
        renderCell: (params) => {
            return (
                Moment(params.row.updatedAt).format('HH:mm:ss, DD/MM/YYYY')
            )
        }
    },
];