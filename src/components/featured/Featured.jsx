import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = (data) => {
  let counttotalBook = 0
  let countBorrowed = 0
  data.bookList.data.data.forEach(element => {
    counttotalBook = counttotalBook + element.stock
  });
  data.borrowedList.data.data.forEach(e => {
    countBorrowed += e.cartItems.reduce((pre, cur) => { return pre + cur.amount }, 0)
  });
  let div = ((countBorrowed/counttotalBook)*100).toFixed(2)

  const NotificationBook = () => {
    if(div >= 0 && div <= 30 ){
      return <p className="desc">Số lượng sách mượn còn ít! Hãy khuyến khích mọi người cùng nhau đọc sách nào!</p>
    }
    else if(div > 30 && div <= 60) {
      return <p className="desc">Hãy cùng nhau trau dồi khiến thức nào!</p>
    }
    else if(div> 60 && div <= 80) {
      return <p className="desc">Thật tuyệt vời khi ai cũng yêu mến sách!</p>
    }
    else if(div > 80 && div < 100) {
      return <p className="desc" style={{color: "red"}}>Số lượng sách của thư viện sắp không đủ điều kiện đáp ứng!</p>
    }
    else if(div == 100) {
      return <p className="desc" style={{color: "red"}}>Thư viện không còn thể đáp ứng số lượng độc giả</p>
    }
    else{
      return <p className="desc">Hệ thống gặp vấn đề!</p>
    }
  }

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Số sách đã mượn</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart" style={{marginTop: 50}}>
          <CircularProgressbar value={div} text={div + "%"} strokeWidth={6}/>
        </div>
        <p className="title">Tổng số sách trong thư viện</p>
        <p className="amount">{countBorrowed + counttotalBook}</p>
        {NotificationBook()}
        <div className="summary">
          {/* <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Featured;
