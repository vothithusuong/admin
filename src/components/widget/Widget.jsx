import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from "react-router-dom";


const Widget = ({ type, dataRes }) => {

  let data;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "TỔNG NGƯỜI DÙNG",
        link: "/users",
        amount: dataRes.data.data.length,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "allbook":
      let counttotalBook = 0
      dataRes.data.data.forEach(element => {
        counttotalBook = counttotalBook + element.stock
      });
      data = {
        title: "TỔNG SỐ SÁCH THỰC TẾ TRONG THƯ VIỆN",
        link: "/books",
        amount: counttotalBook,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "bookborrow":
      let countBorrowed = 0
      dataRes.data.data.forEach(e => {
        countBorrowed += e.cartItems.reduce((pre, cur) => { return pre + cur.amount }, 0)
      }
      )
      data = {
        title: "TỔNG SỐ SÁCH ĐANG ĐƯỢC MƯỢN",
        link: "/borrows",
        amount: countBorrowed,
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    // case "earning":
    //   data = {
    //     title: "PHIÊN MƯỢN",
    //     link: "Xem danh sách các phiên mượn",
    //     icon: (
    //       <MonetizationOnOutlinedIcon
    //         className="icon"
    //         style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
    //       />
    //     ),
    //   };
    //   break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.amount}
        </span>
        <Link to={data.link}>
          <span className="link">Xem chi tiết</span>
        </Link>
      </div>
      <div className="right">
        <div className="percentage positive">

        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
