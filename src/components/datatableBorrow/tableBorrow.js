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
            price = price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
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
    // {
    //     field: "index", headerName: "STT", width: 20, align: "center"
    // },
    {
        field: "idcard",
        headerName: "CCCD",
        headerAlign: "center",
        width: 80,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <Tooltip title={params.row.idcard} arrow>
                        <div>
                            {params.row.idcard}
                        </div>
                    </Tooltip>
                </div>
            );
        }
    },
    {
        field: "name",
        headerName: "Người mượn",
        headerAlign: "center",
        width: 120,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <Tooltip title={params.row.name} arrow>
                        <div>
                            {params.row.name}
                        </div>
                    </Tooltip>
                </div>
            );
        }
    },
    {
        field: "bookname",
        headerName: "Tên sách",
        headerAlign: "center",
        width: 150,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <Tooltip title={params.row.bookId.name} arrow>
                        <div>
                            {params.row.bookId.name}
                        </div>
                    </Tooltip>
                </div>
            );
        }
    },
    {
        field: "amount",
        headerName: "SL",
        headerAlign: "center",
        align: "center",
        width: 60,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    {params.row.amount}
                </div>
            );
        }
    },
    {
        field: "status",
        headerName: "Tình trạng",
        headerAlign: "center",
        align: "center",
        width: 120,
        renderCell: (params) => {
            switch (params.row.status) {
                case "Cận hạn":
                    return (
                        <Chip
                            key={params.row.index}
                            label="Cận hạn"
                            color="warning"
                            style={{ marginRight: 5 }}
                            variant="outlined"
                        ></Chip>
                    )
                case "Quá hạn":
                    return (
                        <Chip
                            key={params.row.index}
                            label="Quá hạn"
                            color="error"
                            style={{ marginRight: 5 }}
                            variant="outlined"
                        ></Chip>
                    )
                case "Đang mượn":
                    return (
                        <Chip
                            key={params.row.index}
                            label="Đang mượn"
                            color="primary"
                            style={{ marginRight: 5 }}
                            variant="outlined"
                        ></Chip>
                    )
                case "Chờ lấy":
                    return (
                        <Chip
                            key={params.row.index}
                            label="Chờ lấy"
                            color="secondary"
                            style={{ marginRight: 5 }}
                            variant="outlined"
                        ></Chip>
                    )
                case "Đã trả":
                    return (
                        <Chip
                            key={params.row.index}
                            label="Đã trả"
                            color="success"
                            style={{ marginRight: 5 }}
                            variant="outlined"
                        ></Chip>
                    )
                case "Đã hủy":
                    return (
                        <Chip
                            key={params.row.index}
                            label="Đã hủy"
                            color="error"
                            style={{ marginRight: 5 }}
                            variant="outlined"
                        ></Chip>
                    )
                default:
                    return (
                        <Chip
                            key={params.row.index}
                            label="Chờ duyệt"
                            style={{ marginRight: 5 }}
                            variant="outlined"
                        ></Chip>
                    )
            }
        }
    },
    {
        field: "timeConfirm",
        headerName: "Thời gian duyệt",
        headerAlign: "center",
        align: "center",
        width: 155,
        renderCell: (params) => {
            if (params.row.timeConfirm) {
                return (
                    Moment(params.row.timeConfirm).format('HH:mm:ss, DD/MM/YYYY')
                )
            } else {
                return (
                    <div style={{ color: "gray" }}>Chưa cập nhật</div>
                )
            }
        }
    },

    {
        field: "timeBorrow",
        headerName: "Thời gian cho mượn",
        headerAlign: "center",
        align: "center",
        width: 160,
        renderCell: (params) => {
            if (params.row.timeBorrow) {
                return (
                    Moment(params.row.timeBorrow).format('HH:mm:ss, DD/MM/YYYY')
                )
            } else {
                return (
                    <div style={{ color: "gray" }}>Chưa cập nhật</div>
                )
            }
        }
    },
    {
        field: "exp",
        headerName: "Thời gian trả sách",
        headerAlign: "center",
        align: "center",
        width: 160,
        renderCell: (params) => {
            if (params.row.exp) {
                return (
                    Moment(params.row.exp).format('HH:mm:ss, DD/MM/YYYY')
                )
            } else {
                return (
                    <div style={{ color: "gray" }}>Chưa cập nhật</div>
                )
            }
        }
    },
    {
        field: "timeReturn",
        headerName: "Thời gian nhận trả",
        headerAlign: "center",
        align: "center",
        width: 160,
        renderCell: (params) => {
            if (params.row.timeReturn) {
                return (
                    Moment(params.row.timeReturn).format('HH:mm:ss, DD/MM/YYYY')
                )
            } else {
                return (
                    <div style={{ color: "gray" }}>Chưa cập nhật</div>
                )
            }
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
            price = price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
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