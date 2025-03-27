import { useEffect, useMemo, useState } from 'react';
import { Badge, Card, message, Modal, Popconfirm, Space, Table, Tag } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd';
import { FetchUsersParams, SUCCESS_CODE, UserInfo } from './UserInfo';
import useUserInfoStore from './UserInfoStore';
import { api } from './UserManager';
import { ExclamationCircleFilled } from '@ant-design/icons';
import UserInfoForm, { UserFormType } from './UserInfoForm';


const UserDisplay = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const convertStatus = (statusCode: string) => {
        switch (statusCode) {
            case 'NORMAL':
                return '正常';
            case 'STOP':
                return '停用'
        }
    }

    const columns: TableProps<UserInfo>['columns'] = useMemo(() => ([
        {
            title: '编号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: '手机号',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '昵称',
            dataIndex: 'nickName',
            key: 'nickName',
        },
        {
            title: '直属主管',
            dataIndex: 'directSupervisorName',
            key: 'directSupervisorName',
        },
        {
            title: '部门',
            dataIndex: 'departmentName',
            key: 'departmentName',
        },

        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status, _) => {
                return (
                    <Badge color={'NORMAL' === status ? "green" : "red"}
                        text={convertStatus(status)} />
                );
            }
        },

        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => {
                        setIsEditModalOpen(true);
                        setEditUserInfo(record);
                    }}>编辑</a>

                    <a onClick={() => {
                        setIsEditPwdModalOpen(true);
                        setEditUserInfo(record);
                    }}>修改密码</a>

                    <Popconfirm
                        title="确定删除用户？"
                        description="删除后不可恢复"
                        okText="删除"
                        cancelText="取消"
                        onConfirm={() => deleteUserById(record)}
                    >
                        <a onClick={(e) => {
                            e.preventDefault();
                        }}>删除</a>
                    </Popconfirm>

                    {/* <button onClick={() => {
                        // e.preventDefault();
                        // showDeleteConfirm(record);
                        Modal.confirm({
                            title: "确认删除",
                            icon: <ExclamationCircleFilled />,
                            content: '你确定要删除这个用户吗？删除后不可恢复',
                            okText: "确认",
                            cancelText: "取消",
                            onOk() {
                                //deleteUserById(user);
                            }
                        });
                    }}>删除</button> */}
                </Space>
            ),
            fixed: "right"
        },
    ]), [])

    // 查询用户
    const userList = useUserInfoStore((state) => state.users);
    const setUserStore = useUserInfoStore((state) => state.setUsers);
    const searchParam = useUserInfoStore((state) => state.searchParam);
    const pagination = useUserInfoStore((state) => state.pagination);
    const setPagination = useUserInfoStore((state) => state.setPagination);

    // 删除用户
    const deleteUserStore = useUserInfoStore((state) => state.deleteUser);


    // 修改用户
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isEditPwdModalOpen, setIsEditPwdModalOpen] = useState(false);
    const [editUserInfo, setEditUserInfo] = useState<UserInfo>();


    useEffect(() => {
        fetchUsers(searchParam, pagination);
    },
        [pagination.current,
        pagination.pageSize,
        searchParam.userName,
        searchParam.phoneNumber]);

    const fetchUsers = async (params: FetchUsersParams, pagination: TablePaginationConfig
    ) => {
        const { userName, phoneNumber } = params
        await api.get("/user/filter", {
            params: {
                userName: userName,
                phoneNumber: phoneNumber,
                userType:'ORDINARY_EMPLOYEES',
                page: pagination.current,
                pageSize: pagination.pageSize
            }
        }).then(response => {
            const { code, message: msg, data } = response.data;
            if (code == SUCCESS_CODE) {
                const { resultList, count } = data;
                setUserStore(resultList);
                setPagination({
                    ...pagination,
                    total: count
                });
            } else {
                messageApi.error(msg);
            }
        }).catch(error => {
            messageApi.error(error.toString());
        });
    }

    const handlePageChange = (pag: TablePaginationConfig, filters: any, sorter: any, extra: any) => {
        console.log(pag);
        setPagination({
            ...pagination,
            current: pag.current && pag.current,
            pageSize: pag.pageSize,
        });
    }

    const showDeleteConfirm = (user: UserInfo) => {
        console.log('confirm delete');
        Modal.confirm({
            title: "确认删除",
            icon: <ExclamationCircleFilled />,
            content: '你确定要删除这个用户吗？删除后不可恢复',
            okText: "确认",
            cancelText: "取消",
            onOk() {
                deleteUserById(user);
            }
        });
    }

    const deleteUserById = async (user: UserInfo) => {
        await api.post("/user/deleteById", {
            id: user.id
        }).then(response => {
            const { code, message: msg } = response.data;
            if (code == SUCCESS_CODE) {
                messageApi.success('删除成功');
                deleteUserStore(user);
            } else {
                messageApi.error(msg);
            }
        }).catch(error => {
            messageApi.error(error);
        });
    }

    return (
        <>
            {contextHolder}
            <Card style={{ height: '70%' }}>
                <Table<UserInfo>
                    columns={columns}
                    dataSource={userList}
                    rowKey="id"
                    pagination={pagination}
                    onChange={handlePageChange}
                />
            </Card>
            <UserInfoForm
                useCase={UserFormType.EDIT}
                userInfo={editUserInfo}
                isModalOpen={isEditModalOpen}
                closeModal={() => { setIsEditModalOpen(false); setEditUserInfo(undefined) }}
                updateUserInfo={setEditUserInfo}
            />

            <UserInfoForm
                useCase={UserFormType.EDIT_PASSWORD}
                userInfo={editUserInfo}
                isModalOpen={isEditPwdModalOpen}
                closeModal={() => { setIsEditPwdModalOpen(false); setEditUserInfo(undefined) }}
                updateUserInfo={setEditUserInfo}
            />
        </>
    );
}

export default UserDisplay;