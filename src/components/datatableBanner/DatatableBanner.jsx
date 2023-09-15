import "./datatableBanner.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getListBook } from "../../context/bookContext/apiCalls"
import LoadingCircle from "../../components/loadingCircle/LoadingCircle";
import { Button, Select, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import Notification from "../../components/alert/Notification";
import Popup from "../popup/popupConfirm/Popup";
import { getListBanner } from "../../context/bannerContext/apiCalls"
import Moment from 'moment';
import PopupBanner from "../popup/popupBanner/PopupBanner";
import { TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const DatatableBanner = () => {
    const [idBook, setIdBook] = useState("")
    const [modalOpen, setModalOpen] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [createUpdate, setCreateUpdate] = useState(0);
    const [banner, setBanner] = useState("")
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });
    const [record, setRecord] = useState("")

    useEffect(() => {
        (async () => {
            const bannerList = await getListBanner(setNotify)
            setBanner(bannerList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
            setRecord(bannerList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
        })()
        return;
    }, [])

    const handleSearch = (e) => {
        const newData = banner.filter(row => {
            return row.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecord(newData)
    }

    const bookColumns = [
        {
            field: "index", headerName: "STT", width: 60, align: "center"
        },
        {
            field: "name",
            headerName: "Tên banner",
            width: 180,
        },
        {
            field: "image",
            headerName: "Hình ảnh",
            width: 100,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                return (
                    <div className="cellWithImg">
                        <img className="cellImg" src={params.row.image} alt="avatar" />
                    </div>
                );
            }
        },
        {
            field: "description",
            headerName: "Mô tả",
            width: 260,
        },
        {
            field: "link",
            headerName: "Đường dẫn",
            width: 150,
        },
        {
            field: "createdAt",
            headerName: "Thời gian tạo",
            width: 180,
            renderCell: (params) => {
                return (
                    Moment(params.row.createdAt).format('HH:mm:ss, DD/MM/YYYY')
                )
            }
        },
        {
            field: "updatedAt",
            headerName: "Thời gian sửa",
            width: 180,
            renderCell: (params) => {
                return (
                    Moment(params.row.updatedAt).format('HH:mm:ss, DD/MM/YYYY')
                )
            }
        },
    ];

    const actionColumn = [
        {
            field: "action",
            headerName: "Thao tác",
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <div
                            className="editButton"
                            onClick={() => {
                                setModalUpdate(true)
                                setIdBook(params.row)
                                setCreateUpdate(2)
                            }}
                        >
                            Cập nhật
                        </div>
                        <div
                            className="deleteButton"
                            onClick={() => {
                                setModalOpen(true)
                                setIdBook(params.row._id)
                            }}
                        >
                            Xóa
                        </div>
                    </div>
                );
            },
            headerAlign: "center",
            align: "center"
        },
    ];
    return (
        <div className="datatablee">
            <div className="datatableTitle">
                Danh sách banner hiển thị
                <div style={{ display: "flex" }}>
                    {/* <TextField
                        size="small"
                        label="Tìm kiếm tên banner"
                        onChange={handleSearch}
                        style={{ marginRight: "10px" }}
                    ></TextField> */}
                    <FormControl size="small" sx={{ marginRight: "10px" }}
                        variant="outlined"
                        id="outlined-required"
                        onChange={handleSearch}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">Tìm kiếm tên banner</InputLabel>
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
                            label="Tìm kiếm tên banner"
                        />
                    </FormControl>
                    <div className="link"
                        onClick={() => {
                            setModalUpdate(true)
                            setCreateUpdate(1)

                        }}
                    >
                        Thêm mới
                    </div>
                </div>
            </div>
            {
                record ?
                    <DataGrid
                        className="datagrid"
                        rows={record}
                        getRowId={(dataBook) => dataBook._id}
                        columns={bookColumns.concat(actionColumn)}
                        pageSize={9}
                        rowsPerPageOptions={[9]}
                        disableSelectionOnClick
                        disableColumnMenu
                    />
                    :
                    <LoadingCircle />
            }
            <div className="modal">
                {modalOpen &&
                    <Popup setOpenModal={setModalOpen}
                        title="Bạn có muốn xóa banner này?"
                        data={idBook}
                        isPopup={4}
                        setNoti={setNotify}
                        setDataUser={setRecord}
                    />}
            </div>
            <div className="modalupdate">
                {modalUpdate &&
                    <PopupBanner
                        setOpenModal={setModalUpdate}
                        createUpdate={createUpdate}
                        data={idBook}
                        category={banner}
                        setNoti={setNotify}
                        setDataBook={setRecord}
                    />}
            </div>

            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </div>
    );
};

export default DatatableBanner;
