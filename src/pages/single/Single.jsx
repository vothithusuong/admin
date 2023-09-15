import "./single.scss";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { getUserCart, getStatsCartUser } from "../../context/userContext/apiCalls"
import Notification from "../../components/alert/Notification";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LoadingCircle from "../../components/loadingCircle/LoadingCircle";
import { Avatar, Tooltip, Chip, Tab } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { getUserReturnedBook, getUserBorrowedBook, getUserConfirmBook, getUserWaittoBorrowBook, getUserCancelBook } from "../../context/bookContext/apiCalls"
import PopupReturn from "../../components/popup/popupReturn/PopupReturn";
import moment from "moment";
import CancelIcon from '@mui/icons-material/Cancel';
import { TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const Single = () => {

  const location = useLocation();
  const [path, userId] = location.pathname.split("/users/");
  const [userCart, setUserCart] = useState("")
  const [statsCart, setStatsCart] = useState(null)
  const [userCartItems, setUserCartItems] = useState(null)
  const [valueTab, setValueTab] = useState("1")
  const [valueButton, setValueButton] = useState(0)
  const [dataConfirm, setDataConfirm] = useState(null)
  const [dataWaitBorrow, setDataWaitBorrow] = useState(null)
  const [dataCancel, setDataCancel] = useState(null)
  const [dataBorrow, setDataBorrow] = useState(null)
  const [dataReturn, setDataReturn] = useState(null)
  const [modalReturn, setModalReturn] = useState(false);
  const [idBorrow, setIDBorrow] = useState(null)
  const [idBook, setIDBook] = useState(null)
  const [amount, setAmount] = useState(null)
  const [nameBook, setNameBook] = useState(null)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [recordAll, setRecordAll] = useState("")
  const [recordWaitConfirm, setRecordWaitConfirm] = useState("")
  const [recordWaittoBorrow, setRecordWaittoBorrow] = useState("")
  const [recordBorrowed, setRecordBorrowed] = useState("")
  const [recordDone, setRecordDone] = useState("")
  const [recordCancel, setRecordCancel] = useState("")

  const handleChangeTab = async (event, newValue) => {
    setValueTab(newValue);
  };

  useEffect(() => {
    (async () => {
      const userCart = await getUserCart(userId, setNotify)
      setUserCart(userCart?.data?.data)
      setUserCartItems(userCart?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))
      setRecordAll(userCart?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))

      const statsCartUser = await getStatsCartUser(userId, setNotify)
      setStatsCart(statsCartUser)


      const userConfirm = await getUserConfirmBook(userId, setNotify)
      setDataConfirm(userConfirm?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))
      setRecordWaitConfirm(userConfirm?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))

      const userWaitBorrow = await getUserWaittoBorrowBook(userId, setNotify)
      setDataWaitBorrow(userWaitBorrow?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))
      setRecordWaittoBorrow(userWaitBorrow?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))

      const userBorrow = await getUserBorrowedBook(userId, setNotify)
      setDataBorrow(userBorrow?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))
      setRecordBorrowed(userBorrow?.data?.data?.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))

      const returnList = await getUserReturnedBook(userId, setNotify)
      setDataReturn(returnList?.data?.data.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))
      setRecordDone(returnList?.data?.data.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))

      const cancelList = await getUserCancelBook(userId, setNotify)
      setDataCancel(cancelList?.data?.data.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))
      setRecordCancel(cancelList?.data?.data.cartItems.slice(0).reverse().map((item, index) => ({ ...item, index: index + 1 })))
    })()
    return;
  }, [])

  console.log(userCart)
  const handleSearch = (e) => {
    const newAll = userCartItems.filter(row => {
      return row.bookId.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    const newWaittoConfirm = dataConfirm.filter(row => {
      return row.bookId.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    const newWaittoBorrow = dataWaitBorrow.filter(row => {
      return row.bookId.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    const newBorrowed = dataBorrow.filter(row => {
      return row.bookId.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    const newReturn = dataReturn.filter(row => {
      return row.bookId.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    const newCancel = dataCancel.filter(row => {
      return row.bookId.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setRecordAll(newAll)
    setRecordWaitConfirm(newWaittoConfirm)
    setRecordWaittoBorrow(newWaittoBorrow)
    setRecordBorrowed(newBorrowed)
    setRecordDone(newReturn)
    setRecordCancel(newCancel)
  }

  const bookColumns = [
    {
      field: "index", headerName: "STT", width: 60, align: "center"
    },
    {
      field: "bookId.name",
      headerName: "Tên sách",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.bookId.image} alt="avatar" />
            {params.row.bookId.name}
          </div>
        );
      }
    },
    {
      field: "timeBorrow",
      headerName: "Tình trạng",
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        if (params.row.isOrder == true && params.row.isConfirm == true && params.row.isBorrowed == true && params.row.isReturned == true && params.row.isCancel == false) {
          const title = `Sách được trả vào ${moment(params.row.timeReturn).format('HH:mm:ss, DD/MM/YYYY')}`
          return (
            <Tooltip key={params.row._id} title={title} arrow>
              <Chip
                key={params.row._id}
                label="Hoàn tất"
                color="success"
                style={{ marginRight: 5 }}
                variant="outlined"
              ></Chip>
            </Tooltip>
          );
        }
        if (params.row.isOrder == true && params.row.isConfirm == true && params.row.isBorrowed == true && params.row.isReturned == false && params.row.isCancel == false) {
          if (new Date(params.row.exp).getTime() < new Date().getTime()) {
            const title = `Quá hạn trả sách ${(new Date((new Date() - new Date(params.row.exp))) / (1000 * 3600 * 24)).toFixed(0)} ngày`
            return (
              <Tooltip key={params.row._id} title={title} arrow>
                <Chip
                  key={params.row._id}
                  label="Quá hạn"
                  color="error"
                  style={{ marginRight: 5 }}
                  variant="outlined"
                ></Chip>
              </Tooltip>
            );
          }
          else if (new Date(params.row.exp).getTime() < new Date().getTime() + 30 * 24 * 60 * 60 * 1000) {
            const title = `Còn ${(new Date((new Date().getTime() + 30 * 24 * 60 * 60 * 1000 - new Date(params.row.exp).getTime())) / (1000 * 3600 * 24)).toFixed(0)} ngày đến hạn trả sách`
            return (
              <Tooltip key={params.row._id} title={title} arrow>
                <Chip
                  key={params.row._id}
                  label="Cận hạn"
                  color="warning"
                  style={{ marginRight: 5 }}
                  variant="outlined"
                ></Chip>
              </Tooltip>

            );
          }
          else {
            const title = `Sách được mượn vào: ${moment(params.row.timeBorrow).format('HH:mm:ss, DD/MM/YYYY')}`
            return (
              <Tooltip key={params.row._id} title={title} arrow>
                <Chip
                  key={params.row._id}
                  label="Đang mượn"
                  color="primary"
                  style={{ marginRight: 5 }}
                  variant="outlined"
                ></Chip>
              </Tooltip>
            );
          }
        }
        if (params.row.isOrder == true && params.row.isConfirm == true && params.row.isBorrowed == false && params.row.isReturned == false && params.row.isCancel == false) {
          // const title = `Sách được trả vào ${moment(params.row.timeReturn).format('HH:mm:ss, DD/MM/YYYY')}`
          return (
            <Tooltip key={params.row._id} title="Hãy thông báo giáo viên đến lấy" arrow>
              <Chip
                key={params.row._id}
                label="Chờ lấy"
                color="secondary"
                style={{ marginRight: 5 }}
                variant="outlined"
              ></Chip>
            </Tooltip>
          );
        }
        if (params.row.isOrder == true && params.row.isConfirm == false && params.row.isBorrowed == false && params.row.isReturned == false && params.row.isCancel == false) {
          // const title = `Sách được trả vào ${moment(params.row.timeReturn).format('HH:mm:ss, DD/MM/YYYY')}`
          return (
            <Tooltip key={params.row._id} title="Phiên mượn này chưa được duyệt!" arrow>
              <Chip
                key={params.row._id}
                label="Chờ duyệt"
                color="warning"
                style={{ marginRight: 5 }}
                variant="outlined"
              ></Chip>
            </Tooltip>
          );
        }
        if (params.row.isCancel == true) {
          const title = `Phiên này đã hủy vào ${moment(params.row.timeCancel).format('HH:mm:ss, DD/MM/YYYY')}`
          return (
            <Tooltip key={params.row._id} title={title} arrow>
              <Chip
                key={params.row._id}
                label="Đã hủy"
                color="error"
                style={{ marginRight: 5 }}
                variant="outlined"
              ></Chip>
            </Tooltip>
          );
        }

      }
    },
    {
      field: "amount", headerName: "Số lượng", width: 100, align: "center", headerAlign: "center",
    },
    {
      field: "teacherConfirm.name",
      headerName: "Người duyệt phiên",
      width: 200,
      renderCell: (params) => {
        if (params.row.teacherConfirm) {
          return (

            <div className="cellWithImg">
              <img className="cellImg" src={params.row.teacherConfirm.image} alt="avatar" />
              {params.row.teacherConfirm.name}
            </div>
          );
        } else {
          return (
            <div className="cellWithImg">
              <Avatar className="cellImg" src="" alt="avatar" />
              Chờ cập nhật...
            </div>
          );
        }

      }
    },
    {
      field: "teacherBorrow.name",
      headerName: "Người cho mượn",
      width: 200,
      renderCell: (params) => {
        if (params.row.teacherBorrow) {
          return (

            <div className="cellWithImg">
              <img className="cellImg" src={params.row.teacherBorrow.image} alt="avatar" />
              {params.row.teacherBorrow.name}
            </div>
          );
        } else {
          return (
            <div className="cellWithImg">
              <Avatar className="cellImg" src="" alt="avatar" />
              Chờ cập nhật...
            </div>
          );
        }

      }
    },
    {
      field: "teacherReturn.name",
      headerName: "Người nhận trả",
      width: 200,
      renderCell: (params) => {
        if (params.row.teacherReturn) {
          return (
            <div className="cellWithImg">
              <img className="cellImg" src={params.row.teacherReturn.image} alt="avatar" />
              {params.row.teacherReturn.name}
            </div>
          );
        }
        else {
          return (
            <div className="cellWithImg">
              <Avatar className="cellImg" src="" alt="avatar" />
              Chờ cập nhật...
            </div>
          );
        }
      }
    },

    {
      field: "exp", headerName: "Thời gian phải trả", width: 180,
      renderCell: (params) => {
        if (params.row.exp) {
          return (
            <div>
              {moment(params.row.exp).format('HH:mm:ss, DD/MM/YYYY')}
            </div>
          );
        }
        else {
          return (
            <div className="cellWithImg">
              Chờ cập nhật...
            </div>
          );
        }
      },
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Thao tác",
      width: 100,
      renderCell: (params) => {
        if (params.row.isOrder == true && params.row.isConfirm == true && params.row.isBorrowed == true && params.row.isReturned == true && params.row.isCancel == false) {
          return (
            <div className="cellAction">

              <button className="viewButtondis" disabled style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              // onClick={() => {
              //   setModalUpdate(true)
              //   setIdBook(params.row)
              //   setCreateUpdate(3)
              // }}
              >
                <CheckCircleIcon style={{ fontSize: "15px", marginRight: "2px" }} />
                Đã trả</button>
            </div>
          );
        }
        if (params.row.isOrder == true && params.row.isConfirm == true && params.row.isBorrowed == true && params.row.isReturned == false && params.row.isCancel == false) {
          return (
            <div className="cellAction" >

              <div className="viewButton" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                onClick={() => {
                  setModalReturn(true)
                  setIDBook(params.row.bookId._id)
                  setNameBook(params.row.bookId.name)
                  setValueButton(3)
                  setAmount(params.row.amount)
                  setIDBorrow(params.row._id)
                }}
              >
                <ReceiptIcon style={{ fontSize: "12px", marginRight: "2px" }} />
                <div>Trả sách</div>
              </div>
            </div>
          );
        }
        if (params.row.isOrder == true && params.row.isConfirm == true && params.row.isBorrowed == false && params.row.isReturned == false && params.row.isCancel == false) {
          return (
            <div className="cellAction" >

              <div className="viewButton" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                onClick={() => {
                  setModalReturn(true)
                  setIDBook(params.row.bookId._id)
                  setNameBook(params.row.bookId.name)
                  setValueButton(2)
                  setAmount(params.row.amount)
                  setIDBorrow(params.row._id)
                }}
              >
                <ReceiptIcon style={{ fontSize: "12px", marginRight: "2px" }} />
                <div>Mượn sách</div>
              </div>
            </div>
          );
        }
        if (params.row.isOrder == true && params.row.isConfirm == false && params.row.isBorrowed == false && params.row.isReturned == false && params.row.isCancel == false) {
          return (
            <div className="cellAction" >

              <div className="viewButton" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                onClick={() => {
                  setModalReturn(true)
                  setIDBook(params.row.bookId._id)
                  setNameBook(params.row.bookId.name)
                  setValueButton(1)
                  setAmount(params.row.amount)
                  setIDBorrow(params.row._id)
                }}
              >
                <ReceiptIcon style={{ fontSize: "12px", marginRight: "2px" }} />
                <div>Duyệt</div>
              </div>
            </div>
          );
        }
        if (params.row.isCancel == true) {
          return (
            <div className="cellAction">

              <button className="viewButtoncan" disabled style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              // onClick={() => {
              //   setModalUpdate(true)
              //   setIdBook(params.row)
              //   setCreateUpdate(3)
              // }}
              >
                <CancelIcon style={{ fontSize: "15px", marginRight: "2px" }} />
                Đã hủy</button>
            </div>
          );
        }
      },
      headerAlign: "center",
      align: "center"
    },
  ];

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        {
          userCart.length !=0 ?
            <>
              <div className="top">
                <div className="left">
                  {/* <div className="editButton"></div> */}
                  <h1 className="title">Thông tin</h1>
                  {
                    userCart ?
                      <div className="item">
                        <img
                          src={userCart?.userBorrowInfo?.image}
                          alt=""
                          className="itemImg"
                        />
                        <div className="details">
                          <h1 className="itemTitle">{userCart?.userBorrowInfo?.name + " "}
                            <Tooltip title="Người này là quản trị viên" arrow>
                              {
                                userCart?.userBorrowInfo?.isAdmin == true ?
                                  <CheckCircleIcon className="icon" />
                                  :
                                  <></>
                              }
                            </Tooltip>
                          </h1>
                          <div className="detailItem">
                            <span className="itemKey">Email:</span>
                            <span className="itemValue">{userCart?.userBorrowInfo?.email}</span>
                          </div>
                          <div className="detailItem">
                            <span className="itemKey">Điện thoại:</span>
                            <span className="itemValue">{userCart?.userBorrowInfo?.phone}</span>
                          </div>
                          <div className="detailItem">
                            <span className="itemKey">Ngày tạo:</span>
                            <span className="itemValue">
                              {moment(userCart?.userBorrowInfo?.createdAt).format("HH:mm:ss, DD/MM/YYYY")}
                            </span>
                          </div>
                          {/* <div className="detailItem">
                      <span className="itemKey">Ngày cập nhật:</span>
                      <span className="itemValue">
                        {moment(userCart.userBorrowInfo.updatedAt).format("HH:mm:ss, DD/MM/YYYY")}
                      </span>
                    </div> */}
                        </div>
                      </div>
                      :
                      <LoadingCircle />

                  }
                </div>
                <div className="right">
                  {
                    statsCart ?
                      <Chart aspect={3 / 1} title="Tầng suất mượn sách (6 tháng)" data={statsCart} />
                      :
                      <LoadingCircle />
                  }

                </div>
              </div>
              <div className="bottom">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <h1 className="title">Danh sách phiên mượn</h1>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {/* <TextField
                      size="small"
                      label="Tìm kiếm tên sách"
                      onChange={handleSearch}
                    ></TextField> */}
                    <FormControl size="small" sx={{ marginRight: "10px" }}
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

                </div>
                {
                  userCartItems && dataBorrow && dataReturn && dataConfirm && dataWaitBorrow && dataCancel ?
                    <TabContext value={valueTab}>
                      <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                        <Tab label={"Tất cả (" + userCartItems.length + ")"} value="1" />
                        <Tab label={"Chờ duyệt (" + dataConfirm.length + ")"} value="4" />
                        <Tab label={"Chờ lấy (" + dataWaitBorrow.length + ")"} value="5" />
                        <Tab label={"Đang mượn (" + dataBorrow.length + ")"} value="2" />
                        <Tab label={"Đã trả (" + dataReturn.length + ")"} value="3" />
                        <Tab label={"Đã hủy (" + dataCancel.length + ")"} value="6" />
                      </TabList>
                      <TabPanel value={"1"} index={0} sx={{ padding: '0px' }}>
                        {
                          recordAll ?
                            <div className="datatableTitle">
                              <DataGrid
                                autoHeight={true}
                                className="datagrid"
                                rows={recordAll}
                                getRowId={(option) => option._id}
                                columns={bookColumns.concat(actionColumn)}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                disableSelectionOnClick
                                disableColumnMenu
                              />
                            </div>
                            :
                            <LoadingCircle />
                        }
                      </TabPanel>
                      <TabPanel value={"2"} index={0} sx={{ padding: '0px' }}>
                        {
                          recordBorrowed ?
                            <div className="datatableTitle">
                              <DataGrid
                                autoHeight={true}
                                className="datagrid"
                                rows={recordBorrowed}
                                getRowId={(option) => option._id}
                                columns={bookColumns.concat(actionColumn)}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                disableSelectionOnClick
                                disableColumnMenu
                              />
                            </div>
                            :
                            <LoadingCircle />
                        }
                      </TabPanel>
                      <TabPanel value={"3"} index={0} sx={{ padding: '0px' }}>
                        {
                          recordDone ?
                            <div className="datatableTitle">
                              <DataGrid
                                autoHeight={true}
                                className="datagrid"
                                rows={recordDone}
                                getRowId={(option) => option._id}
                                columns={bookColumns.concat(actionColumn)}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                disableSelectionOnClick
                                disableColumnMenu
                              />
                            </div>
                            :
                            <LoadingCircle />
                        }
                      </TabPanel>
                      <TabPanel value={"4"} index={0} sx={{ padding: '0px' }}>
                        {
                          recordWaitConfirm ?
                            <div className="datatableTitle">
                              <DataGrid
                                autoHeight={true}
                                className="datagrid"
                                rows={recordWaitConfirm}
                                getRowId={(option) => option._id}
                                columns={bookColumns.concat(actionColumn)}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                disableSelectionOnClick
                                disableColumnMenu
                              />
                            </div>
                            :
                            <LoadingCircle />
                        }
                      </TabPanel>
                      <TabPanel value={"5"} index={0} sx={{ padding: '0px' }}>
                        {
                          recordWaittoBorrow ?
                            <div className="datatableTitle">
                              <DataGrid
                                autoHeight={true}
                                className="datagrid"
                                rows={recordWaittoBorrow}
                                getRowId={(option) => option._id}
                                columns={bookColumns.concat(actionColumn)}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                disableSelectionOnClick
                                disableColumnMenu
                              />
                            </div>
                            :
                            <LoadingCircle />
                        }
                      </TabPanel>
                      <TabPanel value={"6"} index={0} sx={{ padding: '0px' }}>
                        {
                          recordCancel ?
                            <div className="datatableTitle">
                              <DataGrid
                                autoHeight={true}
                                className="datagrid"
                                rows={recordCancel}
                                getRowId={(option) => option._id}
                                columns={bookColumns.concat(actionColumn)}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                disableSelectionOnClick
                                disableColumnMenu
                              />
                            </div>
                            :
                            <LoadingCircle />
                        }
                      </TabPanel>
                    </TabContext>
                    :
                    <LoadingCircle />
                }
              </div>
              <div className="modal">
                {
                  modalReturn &&
                  <PopupReturn
                    nameBook={nameBook}
                    setOpenModal={setModalReturn}
                    data={idBook}
                    setNotify={setNotify}
                    setDataUser={userCart}
                    setUserCartItems={setUserCartItems}
                    setDataConfirm={setDataConfirm}
                    setDataWaitBorrow={setDataWaitBorrow}
                    setDataBorrow={setDataBorrow}
                    setDataReturn={setDataReturn}
                    setDataCancel={setDataCancel}
                    setRecordCancel={setRecordCancel}
                    setRecordDone={setRecordDone}
                    setRecordBorrowed={setRecordBorrowed}
                    setRecordWaittoBorrow={setRecordWaittoBorrow}
                    setRecordWaitConfirm={setRecordWaitConfirm}
                    setRecordAll={setRecordAll}
                    valueButton={valueButton}
                    amount={amount}
                    idBorrow={idBorrow}
                  />
                }
              </div>
            </>
            :
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", marginTop: "30px", marginBottom: "15px" }}>
              <img src="https://t4.ftcdn.net/jpg/01/98/86/63/360_F_198866399_vQambmqMEK9975X1Yg7686t4nFpSaubL.jpg" alt="" />
            </div>
        }

      </div>
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
    </div>
  );
};

export default Single;
