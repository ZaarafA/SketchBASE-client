import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import EditProfileButton from "./EditProfileButton";

const TestBench = () => {


    return (
        <div className="container">
          <Header />
          <div className="main">
            <Sidebar />
            <div className="content">
                <EditProfileButton></EditProfileButton>
            </div>
          </div>
        </div>
      );
};

export default TestBench;