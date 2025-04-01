import { Flex } from "antd";
import UserManageOption from "./UserManageOption";
import UserDisplay from "./UserDisplay";
import React from "react";

const UserManage = () => (
  <Flex vertical={true} gap={"middle"}>
    <UserManageOption />
    <UserDisplay />
  </Flex>
);

export default UserManage;
