import { Button, Card, Flex, Input } from "antd";
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from "react";
import useUserInfoStore from "./UserInfoStore";
import { FetchUsersParams, UserInfo } from "./UserInfo";
import axios from "axios";
import UserInfoForm, { UserFormType } from "./UserInfoForm";

export const api = axios.create({
    baseURL: 'http://localhost:8080'
});

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
            current: 1
        });
    }

    const handleSearchUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParam({
            ...searchParam,
            userName: event.target.value,
        });
    }

    const handleSearchPhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParam({
            ...searchParam,
            phoneNumber: event.target.value,
        });
    }

    return (
        <Card variant="borderless"
            style={{ height: '30%' }}>
            <Flex vertical={true}
                justify="center"
                align="start"
                gap="large"
            >
                <span style={{ fontSize: '20px' }}>用户管理</span>
                <Flex justify="start"
                    align="center"
                    gap="large"
                    style={{ width: '100%' }}>
                    <Flex
                        style={{ width: '30%' }}
                        align="center"
                        justify="start">
                        <span style={{ width: '20%' }}>用户名</span>
                        <Input
                            style={{ width: '50%' }}
                            placeholder="请输入用户名"
                            onChange={handleSearchUserNameChange}
                        />
                    </Flex>
                    <Flex
                        style={{ width: '30%' }}
                        justify="start"
                        align="center">
                        <span style={{ width: '20%' }}>手机号</span>
                        <Input
                            style={{ width: '50%' }}
                            placeholder="请输入手机号"
                            onChange={handleSearchPhoneNumberChange}
                        />
                    </Flex>
                </Flex>
                <Flex justify="space-between"
                    style={{ width: '100%' }}>
                    <Button type="primary"
                        icon={<SearchOutlined />}
                        onClick={handleSearchUserInfo}>
                        查询
                    </Button>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsModalOpen(true)}>
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
}

export default UserManageOption;