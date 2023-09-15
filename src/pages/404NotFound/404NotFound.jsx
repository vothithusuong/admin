import "./404NotFound.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, { useState } from "react";
import Notification from "../../components/alert/Notification";


const NotFound = () => {
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });

    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", marginTop: "30px", marginBottom: "15px" }}>
                    <img src="https://t4.ftcdn.net/jpg/01/98/86/63/360_F_198866399_vQambmqMEK9975X1Yg7686t4nFpSaubL.jpg" alt="" />
                </div>
            </div>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </div>
    );
};

export default NotFound;
