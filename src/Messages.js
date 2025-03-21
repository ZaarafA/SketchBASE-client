// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Messages = () => {

    return (
    <div className="container">
        <Header/>
        <div className="main">
            <Sidebar/>
            <div className="content">

            </div>
        </div>
    </div>
    );
};

export default Messages;
