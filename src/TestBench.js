import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import EditProfileButton from "./EditProfileButton";
import ServiceButton from "./ServicesButton";

const TestBench = () => {


    return (
        <div className="container">
          <Header />
          <div className="main">
            <Sidebar />
            <div className="content">
                <ServiceButton></ServiceButton>
            </div>
          </div>
        </div>
      );
};

export default TestBench;