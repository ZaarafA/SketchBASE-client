import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ImageUploadButton from "./imageUploadButton";

const TestBench = () => {


    return (
        <div className="container">
          <Header />
          <div className="main">
            <Sidebar />
            <div className="content">
                <ImageUploadButton/>
            </div>
          </div>
        </div>
      );
};

export default TestBench;