import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Tab } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Notification from "../../components/alert/Notification";
import LoadingCircle from "../../components/loadingCircle/LoadingCircle";
import { getBorrowedBook, getCartAdmin, getReturnedBook, getConfirmBook, getWaittoBorrowBook, getCancelBook } from "../../context/bookContext/apiCalls";
import PopupBorrow from "../popup/popupBorrow/PopupBorrow";
import PopupExportBorrow from "../popup/popupExportBorrow/PopupExportBorrow";
import "./datatableBorrow.scss";
import { allColumns, returnColumns, userColumns } from "./tableBorrow";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const DatatableBorrow = () => {

    const [dataUser, setDataUser] = useState("")
    const [dataConfirm, setDataConfirm] = useState("")
    const [dataWaittoBorrow, setDataWaittoBorrow] = useState("")
    const [dataReturn, setDataReturn] = useState("")
    const [dataCancel, setDataCancel] = useState("")
    const [dataCart, setDataCart] = useState("")
    const [modalBorrow, setModalBorrow] = useState(false);
    const [modalExport, setModalExport] = useState(false);
    const [createUpdate, setCreateUpdate] = useState(0);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });
    const [valueTab, setValueTab] = useState("1")

    const [recordAll, setRecordAll] = useState("")
    const [recordWaitConfirm, setRecordWaitConfirm] = useState("")
    const [recordWaittoBorrow, setRecordWaittoBorrow] = useState("")
    const [recordBorrowed, setRecordBorrowed] = useState("")
    const [recordDone, setRecordDone] = useState("")
    const [recordCancel, setRecordCancel] = useState("")

    const handleSearch = (e) => {
        const newAll = dataCart.filter(row => {
            return row.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        const newWaittoConfirm = dataConfirm.filter(row => {
            return row.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        const newWaittoBorrow = dataWaittoBorrow.filter(row => {
            return row.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        const newBorrowed = dataUser.filter(row => {
            return row.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        const newReturn = dataReturn.filter(row => {
            return row.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        const newCancel = dataCancel.filter(row => {
            return row.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecordAll(newAll)
        setRecordWaitConfirm(newWaittoConfirm)
        setRecordWaittoBorrow(newWaittoBorrow)
        setRecordBorrowed(newBorrowed)
        setRecordDone(newReturn)
        setRecordCancel(newCancel)
    }
    console.log(dataCart)
    useEffect(() => {
        (async () => {
            const cartList = await getCartAdmin(setNotify)
            setDataCart(cartList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
            setRecordAll(cartList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
            const clonecartList = cartList?.data?.data.map((item, index) => ({ ...item, index: index + 1 }))
            if (clonecartList) {
                for (let index = 0; index < clonecartList.length; index++) {
                    switch (clonecartList[index].status) {
                        case "Cận hạn":
                        case "Quá hạn":
                        case "Đang mượn":
                            setDataUser(dataUser => [...dataUser, clonecartList[index]])
                            setRecordBorrowed(dataUser => [...dataUser, clonecartList[index]])
                            break;
                        case "Chờ lấy":
                            setDataWaittoBorrow(dataWaittoBorrow => [...dataWaittoBorrow, clonecartList[index]])
                            setRecordWaittoBorrow(dataWaittoBorrow => [...dataWaittoBorrow, clonecartList[index]])
                            break;
                        case "Đã trả":
                            setDataReturn(dataReturn => [...dataReturn, clonecartList[index]])
                            setRecordDone(dataReturn => [...dataReturn, clonecartList[index]])
                            break;
                        case "Đã hủy":
                            setDataCancel(dataCancel => [...dataCancel, clonecartList[index]])
                            setRecordCancel(dataCancel => [...dataCancel, clonecartList[index]])
                            break;
                        default:
                            setDataConfirm(dataConfirm => [...dataConfirm, clonecartList[index]])
                            setRecordWaitConfirm(dataConfirm => [...dataConfirm, clonecartList[index]])
                            break;
                    }

                }

            }
        })()
        return;
    }, [])

    const handleChangeTab = async (event, newValue) => {
        setValueTab(newValue);
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Thao tác",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={"/users/" + params.row.iduser} style={{ textDecoration: "none" }}>
                            <div className="viewButton">Chi tiết</div>
                        </Link>
                    </div>
                );
            },
            headerAlign: "center",
            align: "center"
        },
    ];
    return (
        <div className="datatable">
            <div className="datatableTitle">
                Danh sách phiên mượn sách
                <div style={{ display: "flex" }}>
                    <div className="link" onClick={() => {
                        setModalExport(true)
                        setCreateUpdate(2)
                    }}>
                        Thống kê
                    </div>
                    <FormControl size="small" sx={{ marginRight: "10px", marginLeft: "10px" }}
                        variant="outlined"
                        id="outlined-required"
                        onChange={handleSearch}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">Tìm kiếm tên người dùng</InputLabel>
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
                            label="Tìm kiếm tên người dùng"
                        />
                    </FormControl>
                    <div className="link" onClick={() => {
                        setModalBorrow(true)
                        setCreateUpdate(2)
                    }}>
                        Mượn sách
                    </div>
                </div>
            </div>
            {
                dataCart ?
                    <TabContext value={valueTab}>
                        <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                            <Tab label={"Tất cả (" + dataCart.length + ")"} value="1" />
                            <Tab label={"chờ duyệt (" + dataConfirm.length + ")"} value="4" />
                            <Tab label={"Chờ lấy (" + dataWaittoBorrow.length + ")"} value="5" />
                            <Tab label={"Đang mượn (" + dataUser.length + ")"} value="2" />
                            <Tab label={"Đã trả (" + dataReturn.length + ")"} value="3" />
                            <Tab label={"Đã hủy (" + dataCancel.length + ")"} value="6" />
                        </TabList>
                        <TabPanel value={"1"} index={0} sx={{ padding: '0px' }}>

                            <DataGrid
                                autoHeight={true}
                                className="datagrid"
                                rows={recordAll}
                                columns={allColumns.concat(actionColumn)}
                                getRowId={(dataUser) => dataUser._id}
                                pageSize={9}
                                rowsPerPageOptions={[9]}
                                disableSelectionOnClick
                                disableColumnMenu
                            />

                        </TabPanel>
                        <TabPanel value={"4"} index={0} sx={{ padding: '0px' }}>
                            <DataGrid
                                autoHeight={true}
                                className="datagrid"
                                rows={recordWaitConfirm}
                                columns={allColumns.concat(actionColumn)}
                                getRowId={(dataConfirm) => dataConfirm._id}
                                pageSize={9}
                                rowsPerPageOptions={[9]}
                                disableSelectionOnClick
                                disableColumnMenu
                            />
                        </TabPanel>
                        <TabPanel value={"5"} index={0} sx={{ padding: '0px' }}>
                            <DataGrid
                                autoHeight={true}
                                className="datagrid"
                                rows={recordWaittoBorrow}
                                columns={allColumns.concat(actionColumn)}
                                getRowId={(dataWaittoBorrow) => dataWaittoBorrow._id}
                                pageSize={9}
                                rowsPerPageOptions={[9]}
                                disableSelectionOnClick
                                disableColumnMenu
                            />
                        </TabPanel>
                        <TabPanel value={"2"} index={1} sx={{ padding: '0px' }}>
                            <DataGrid
                                autoHeight={true}
                                className="datagrid"
                                rows={recordBorrowed}
                                columns={allColumns.concat(actionColumn)}
                                getRowId={(dataUser) => dataUser._id}
                                pageSize={9}
                                rowsPerPageOptions={[9]}
                                disableSelectionOnClick
                                disableColumnMenu

                            />
                        </TabPanel>
                        <TabPanel value={"3"} index={2} sx={{ padding: '0px' }}>
                            <DataGrid
                                autoHeight={true}
                                className="datagrid"
                                rows={recordDone}
                                columns={allColumns.concat(actionColumn)}
                                getRowId={(dataUser) => dataUser._id}
                                pageSize={9}
                                rowsPerPageOptions={[9]}
                                disableSelectionOnClick
                                disableColumnMenu
                            />
                        </TabPanel>
                        <TabPanel value={"6"} index={2} sx={{ padding: '0px' }}>
                            <DataGrid
                                autoHeight={true}
                                className="datagrid"
                                rows={recordCancel}
                                columns={allColumns.concat(actionColumn)}
                                getRowId={(dataUser) => dataUser._id}
                                pageSize={9}
                                rowsPerPageOptions={[9]}
                                disableSelectionOnClick
                                disableColumnMenu
                            />
                        </TabPanel>
                    </TabContext>
                    :
                    <LoadingCircle />
            }
            <div className="modalupdate">
                {modalBorrow &&
                    <PopupBorrow
                        setOpenModal={setModalBorrow}
                        setNoti={setNotify}
                        createUpdate={createUpdate}
                        setDataUser={setRecordBorrowed}
                        setDataCart={setRecordAll}
                    />}
            </div>
            <div className="modalupdate">
                {modalExport &&
                    <PopupExportBorrow
                        setOpenModal={setModalExport}
                        setNoti={setNotify}
                    />}
            </div>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </div>
    );
};

export default DatatableBorrow;
