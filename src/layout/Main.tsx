import { Route, Routes } from "react-router-dom";
import UserManage from "../userManage/UserManage";
import OrgManage from "../orgManage/OrgManage";
import Dashboard from "../dashboard/Dashboard";
import React from "react";

const Main = () => {
    return (
        <Routes>
            <Route path="/Permission/UserManage" element={<UserManage />} />
            <Route path="/Permission/OrgManage" element={<OrgManage />} />
            <Route path="*" element={<Dashboard />} />
        </Routes>
    );
}

export default Main;