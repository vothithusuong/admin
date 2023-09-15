import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import React, { useEffect, useState } from "react";
import { getListUser } from "../../context/userContext/apiCalls"
import { getListBook, getBorrowedBook, getBorrowedStats } from "../../context/bookContext/apiCalls"
import Notification from "../../components/alert/Notification";
import LoadingCircle from "../../components/loadingCircle/LoadingCircle";


const Home = () => {
  const [userList, setUserList] = useState("")
  const [bookList, setBookList] = useState("")
  const [borrowedList, setBorrowedList] = useState("")
  const [borrowedStats, setBorrowedStats] = useState("")
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const checkUserList = () => {
    if(userList){
      return <Widget type="user" dataRes={userList} />
    }
    else {
      return <LoadingCircle/>
    }
  }
  const checkAllBookList = () => {
    if(bookList){
      return <Widget type="allbook" dataRes={bookList} />
    }
    else {
      return <LoadingCircle/>
    }
  }
  const checkAllBorrowList = () => {
    if(borrowedList){
      return <Widget type="bookborrow" dataRes={borrowedList} />
    }
    else {
      return <LoadingCircle/>
    }
  }
  // const checkBookList = () => {
  //   if(bookList){
  //     return <Widget type="book" dataRes={bookList} />
  //   }
  //   else {
  //     return <LoadingCircle/>
  //   }
  // }
  const checkBorrowed = () => {
    if(borrowedList && bookList){
      return <Featured borrowedList ={borrowedList} bookList={bookList}/>
    }
    else {
      return <LoadingCircle/>
    }
  }
  const checkBorrowedStats = () => {
    if(borrowedStats){
      return <Chart title="Thông kê phiên mượn" aspect={2 / 1 } data = {borrowedStats}/>
    }
    else {
      return <LoadingCircle/>
    }
  }
  useEffect(() => {
    (async () => {
      const userItems = await getListUser(setNotify)
      const bookItems = await getListBook(1, setNotify)
      const borrowedItems = await getBorrowedBook(setNotify)
      const borrowedStatsItems = await getBorrowedStats(setNotify)
      setUserList(userItems)
      setBookList(bookItems)
      setBorrowedList(borrowedItems)
      setBorrowedStats(borrowedStatsItems)
    })()

    return;
  }, [])

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          {checkUserList()}
          {/* {checkBookList()} */}
          {checkAllBookList()}
          {checkAllBorrowList()}
          {/* {checkAllBookList()} */}
        </div>
        <div className="charts">
          {checkBorrowed()}
          {checkBorrowedStats()}
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
      </div>
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
    </div>
  );
};

export default Home;
