import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getListUser, handleChangeRole, handleDelete, exportFileUser } from "../../context/userContext/apiCalls"
import LoadingCircle from "../../components/loadingCircle/LoadingCircle";
import { Button, Select, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import Notification from "../../components/alert/Notification";
import Popup from "../popup/popupConfirm/Popup";
import PopupUpdate from "../popup/popupUpdate/PopupUpdate";
import Moment from 'moment';
import { TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import PopupUpload from "../popup/popupUpload/PopupUpload";
import PopupReset from "../popup/popupReset/PopupReset";

const Datatable = () => {

  const [dataUser, setDataUser] = useState("")
  const [idUser, setIdUser] = useState("")
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalUpload, setModalUpload] = useState(false);
  const [modalReset, setModalReset] = useState(false);
  const [createUpdate, setCreateUpdate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [record, setRecord] = useState("")

  useEffect(() => {
    (async () => {
      const userList = await getListUser(setNotify)
      setDataUser(userList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
      setRecord(userList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
    })()
    return;
  }, [])

  const handleSearch = (e) => {
    const newData = dataUser.filter(row => {
      return row.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setRecord(newData)
  }

  const userColumns = [
    {
      field: "index", headerName: "STT", width: 60, align: "center"
    },
    { field: "userId", headerName: "Mã người dùng", width: 150 },
    {
      field: "name",
      headerName: "Người dùng",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.image} alt="avatar" />
            {params.row.name}
          </div>
        );
      }
    },
    {
      field: "idcard",
      headerName: "CCCD/ Mã định danh",
      width: 170,
    },
    {
      field: "phone",
      headerName: "SĐT",
      width: 110,
    },
    {
      field: "isAdmin",
      headerName: "Quản trị",
      width: 110,
      renderCell: (params) => {
        return (
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={params.row.isAdmin}
            onChange={async (value) => {
              await handleChangeRole(params.row._id, value, setNotify)
              const userList = await getListUser(setNotify)
              setDataUser(userList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
              setRecord(userList?.data?.data.map((item, index) => ({ ...item, index: index + 1 })))
            }}
          // onClick={
          //   !params.row.isAdmin
          // }
          />
        );
      },
      align: "center"
    },
    {
      field: "createdAt",
      headerName: "Thời gian tạo",
      width: 170,
      renderCell: (params) => {
        return (
          Moment(params.row.createdAt).format('HH:mm:ss, DD/MM/YYYY')
        )
      }
    },
    {
      field: "updatedAt",
      headerName: "Thời gian sửa",
      width: 170,
      renderCell: (params) => {
        return (
          Moment(params.row.updatedAt).format('HH:mm:ss, DD/MM/YYYY')
        )
      }
    },
    // {
    //   field: "isDeleted",
    //   headerName: "Trạng thái",
    //   width: 160,
    //   renderCell: (params) => {
    //     return (
    //       <div className={`cellWithStatus ${params.row.status}`}>
    //         {params.row.status}
    //       </div>
    //     );
    //   },
    // },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Thao tác",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to={"/users/" + params.row._id} style={{ textDecoration: "none" }}>
              <div className="viewButton">Chi tiết</div>
            </Link> */}
            <div
              className="editButton"
              onClick={() => {
                setModalUpdate(true)
                setIdUser(params.row)
                setCreateUpdate(1)
              }}
            >
              Cập nhật
            </div>
            <div
              className="resetButton"
              onClick={() => {
                setModalReset(true)
                setIdUser(params.row._id)
              }}
            >
              Cấp lại
            </div>
            <div
              className="deleteButton"
              onClick={() => {
                setModalOpen(true)
                setIdUser(params.row._id)
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
    <div className="datatable">
      <div className="datatableTitle">
        Danh sách người dùng
        <div style={{ display: "flex" }}>
          <div className="link" style={{ marginRight: "10px" }} onClick={() => {
            setModalUpload(true)
            setCreateUpdate(1)
          }}>
            Thêm dữ liệu
          </div>
          <button className="linkEx" style={{ marginRight: "10px" }} disabled={loading} onClick={async() => {
            setLoading(true);
            await exportFileUser(setNotify);
            setLoading(false);
          }}>
            {
              loading ?
              <>Đang xuất...</>
              :
              <>Xuất dữ liệu</>
            }

          </button>
          <FormControl size="small" sx={{ marginRight: "10px" }}
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
            setModalUpdate(true)
            setCreateUpdate(2)
          }}>
            Thêm mới
          </div>
        </div>

      </div>
      {
        record ?
          <DataGrid
            className="datagrid"
            rows={record}
            columns={userColumns.concat(actionColumn)}
            getRowId={(dataUser) => dataUser._id}
            pageSize={9}
            rowsPerPageOptions={[9]}
            disableSelectionOnClick
          //disableColumnMenu
          />
          :
          <LoadingCircle />
      }
      <div className="modal">
        {modalOpen &&
          <Popup setOpenModal={setModalOpen}
            title="Bạn có muốn xóa người dùng này?"
            data={idUser}
            isPopup={2}
            setNoti={setNotify}
            setDataUser={setRecord}
          />}
      </div>
      <div className="modalupdate">
        {modalUpdate &&
          <PopupUpdate setOpenModal={setModalUpdate}
            data={idUser}
            setNoti={setNotify}
            createUpdate={createUpdate}
            setDataUser={setRecord}
          />}
      </div>
      <div className="modalupdate">
        {modalUpload &&
          <PopupUpload setOpenModal={setModalUpload}
            setNoti={setNotify}
            isPopup={1}
            setDataUser={setRecord}
          />}
      </div>
      <div className="modalupdate">
        {modalReset &&
          <PopupReset
            iduser={idUser}
            setOpenModal={setModalReset}
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

export default Datatable;
