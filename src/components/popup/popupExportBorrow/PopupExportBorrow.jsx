import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import "./popupExportBorrow.scss"
import { Tooltip, Chip } from '@mui/material';
import { getCartInTime, exportCartInTime } from "../../../context/bookContext/apiCalls"
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import Moment from 'moment';
import { Workbook } from 'exceljs'

const PopupExportBorrow = ({ setOpenModal, setNoti }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])
    const [start, setStart] = useState(dayjs(new Date()));
    const [end, setEnd] = useState(dayjs(new Date()));

    const exportExcel = () => {
        const wb = new Workbook();
        const ws = wb.addWorksheet("Phiên mượn")
        ws.columns = [
            { header: "STT", key: "stt" },
            { header: "CCCD/ Mã định danh", key: "userId", width: 20 },
            { header: "Họ và Tên", key: "name" , width: 20 },
            { header: "Tên sách", key: "bookname" , width: 20 },
            { header: "Số lượng", key: "amount" , width: 20 },
            { header: "Thời gian duyệt", key: "timeConfirm" , width: 20 },
            { header: "Người duyệt", key: "teacherConfirm" , width: 20 },
            { header: "Thời gian mượn", key: "timeBorrow" , width: 20 },
            { header: "Người cho mượn", key: "teacherBorrow" , width: 20 },
            { header: "Thời hạn mượn sách", key: "exp" , width: 20 },
            { header: "Thời gian đã trả", key: "timeReturn" , width: 20 },
            { header: "Người nhận sách trả", key: "teacherReturn" , width: 20 },
            { header: "Thời gian hủy", key: "timeCancel" , width: 20 },
            { header: "Người hủy sách", key: "teacherCancel" , width: 20 },
            { header: "Tình trạng sách", key: "status" , width: 20 },
        ];
        let i = 0;
        data?.map(dataBorrow => {
            ws.addRow({
                stt: dataBorrow.index,
                userId: dataBorrow.idcard,
                name: dataBorrow.name,
                bookname: dataBorrow.bookId.name,
                amount: dataBorrow.amount,
                timeConfirm: dataBorrow.timeConfirm ? Moment(dataBorrow.timeConfirm).format('HH:mm:ss, DD/MM/YYYY') : "Chờ cập nhật",
                teacherConfirm: dataBorrow.teacherConfirm ? dataBorrow.teacherConfirm.name : "Chờ cập nhật",
                timeBorrow: dataBorrow.timeBorrow ? Moment(dataBorrow.timeBorrow).format('HH:mm:ss, DD/MM/YYYY') : "Chờ cập nhật",
                teacherBorrow: dataBorrow.teacherBorrow ? dataBorrow.teacherBorrow.name : "Chờ cập nhật",
                exp: dataBorrow.exp ? Moment(dataBorrow.exp).format('HH:mm:ss, DD/MM/YYYY') : "Chờ cập nhật",
                timeReturn: dataBorrow.timeReturn ? Moment(dataBorrow.timeReturn).format('HH:mm:ss, DD/MM/YYYY') : "Chờ cập nhật",
                teacherReturn: dataBorrow.teacherReturn ? dataBorrow.teacherReturn.name : "Chờ cập nhật",
                timeCancel: dataBorrow.timeCancel ? Moment(dataBorrow.timeCancel).format('HH:mm:ss, DD/MM/YYYY') : "Chờ cập nhật",
                teacherCancel: dataBorrow.teacherCancel ? dataBorrow.teacherCancel.name : "Chờ cập nhật",
                status: dataBorrow.status
            })
        });
        ws.getRow(1).eachCell((cell) => {
            cell.font = { bold: true }
        })
        wb.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheatml.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = "Phienmuon.xlsx";
            anchor.click();
            window.URL.revokeObjectURL(url);
        })
    }
    const handleChangeStart = (newValue) => {
        setStart(newValue);
    };
    const handleChangeEnd = (newValue) => {
        setEnd(newValue);
    };
    const bookColumns = [
        {
            field: "index", headerName: "STT", width: 20, align: "center"
        },
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
            headerName: "Họ và Tên",
            headerAlign: "center",
            width: 130,
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
            width: 120,
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
                        <Tooltip title={params.row.amount} arrow>
                            <div>
                                {params.row.amount}
                            </div>
                        </Tooltip>
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
                        <div style={{color: "gray"}}>Chưa cập nhật</div>
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
                        <div style={{color: "gray"}}>Chưa cập nhật</div>
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
                        <div style={{color: "gray"}}>Chưa cập nhật</div>
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
                        <div style={{color: "gray"}}>Chưa cập nhật</div>
                    )
                }
            }
        },

    ];
    return (
        <div className="modalBackgroundExport">
            <div className="modalContainerExport">
                <div className="title">
                    Thống kê phiên mượn
                </div>
                <div className="choosedate">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Thời gian bắt đầu"
                                value={start}
                                sx={{ marginRight: "10px", marginLeft: "10px" }}
                                onChange={handleChangeStart}
                                slotProps={{ textField: { size: 'small' } }}
                                renderInput={(params) => <TextField {...params} />}
                                mask="__/__/____"
                                inputFormat="DD/MM/YYYY"
                            />
                        </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={1}>
                            <DesktopDatePicker
                                label="Thời gian kết thúc"
                                value={end}
                                onChange={handleChangeEnd}
                                slotProps={{ textField: { size: 'small' } }}
                                renderInput={(params) => <TextField {...params} />}
                                mask="__/__/____"
                                inputFormat="DD/MM/YYYY"
                            />
                        </Stack>
                    </LocalizationProvider>
                    <button className="confirmBorrow" disabled={loading}
                        onClick={async () => {
                            setLoading(true);
                            const cartList = await getCartInTime({ startTime: dayjs(start.$d).format("YYYY-MM-DD"), endTime: dayjs(end.$d).format("YYYY-MM-DD") }, setNoti)
                            setData(cartList?.data?.data?.map((item, index) => ({ ...item, index: index + 1 })))
                            setLoading(false);
                        }}>
                        {
                            loading ?
                                <div className='Loader' />
                                :
                                <>Lọc thông tin</>
                        }
                    </button>
                </div>
                <form>
                    <div className='fieldInfor'>
                        {/* {
                            record ? */}
                        <DataGrid
                            className="datagrid"
                            rows={data}
                            sx={{ height: "500px", marginTop: "10px", marginLeft: "10px" }}
                            columns={bookColumns}
                            getRowId={(book) => book.index}
                            pageSize={7}
                            rowsPerPageOptions={[7]}
                            disableSelectionOnClick
                            disableColumnMenu
                        />
                        {/* :
                                <LoadingCircle />
                        } */}
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
                            exportExcel(data)
                            setLoading(false);
                        }}>
                        {
                            loading ?
                                <div className='Loader' />
                                :
                                <>Xuất dữ liệu</>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PopupExportBorrow