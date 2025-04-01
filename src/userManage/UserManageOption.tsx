import { Button, Card, Flex, Input } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import useUserInfoStore from "./UserInfoStore";
import { FetchUsersParams, UserInfo } from "./UserInfo";
import UserInfoForm, { UserFormType } from "./UserInfoForm";
import styles from "./userManageOption.module.css";
import React from "react";

const UserManageOption = () => {
  // 创建用户所需state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createUserInfo, setCreateUserInfo] = useState<UserInfo>();

  // 查询用户所需state
  const [searchParam, setSearchParam] = useState<FetchUsersParams>(); // 先记录到组件内部，点击查询按钮时再更新到store中
  const setStoreSearchParam = useUserInfoStore((state) => state.setSearchParam);
  const pagination = useUserInfoStore((state) => state.pagination);
  const setPagination = useUserInfoStore((state) => state.setPagination);

  const handleSearchUserInfo = () => {
    setStoreSearchParam(searchParam);
    setPagination({
      ...pagination,
      current: 1,
    });
  };

  const handleSearchUserNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchParam({
      ...searchParam,
      userName: event.target.value,
    });
  };

  const handleSearchPhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchParam({
      ...searchParam,
      phoneNumber: event.target.value,
    });
  };

  return (
    <Card variant="borderless" className={styles.card}>
      <Flex vertical={true} justify="center" align="start" gap="large">
        <span className={styles.userMangeOpLabel}>用户管理</span>
        <Flex
          justify="start"
          align="center"
          gap="large"
          className={styles.userManageOpFlex}
        >
          <Flex className={styles.userNameFelx} align="center" justify="start">
            <span className={styles.userNameLabel}>用户名</span>
            <Input
              className={styles.userNameInput}
              placeholder="请输入用户名"
              onChange={handleSearchUserNameChange}
            />
          </Flex>
          <Flex className={styles.phoneNumFelx} justify="start" align="center">
            <span className={styles.phoneNumberLabel}>手机号</span>
            <Input
              className={styles.phoneNumberInput}
              placeholder="请输入手机号"
              onChange={handleSearchPhoneNumberChange}
            />
          </Flex>
        </Flex>
        <Flex justify="space-between" className={styles.searchFelx}>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearchUserInfo}
          >
            查询
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            创建用户
          </Button>
          <UserInfoForm
            useCase={UserFormType.CREATE}
            isModalOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            updateUserInfo={setCreateUserInfo}
            userInfo={createUserInfo}
          />
        </Flex>
      </Flex>
    </Card>
  );
};

export default UserManageOption;
