import { Button, Form, Input, message, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { SUCCESS_CODE, UserInfo } from './UserInfo'
import { api } from './UserManager'
import useUserInfoStore from './UserInfoStore'
import Password from 'antd/es/input/Password'

const { Option } = Select;

export enum UserFormType {
    CREATE,
    EDIT,
    EDIT_PASSWORD
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

type Props = {
    useCase: UserFormType,
    userInfo: UserInfo | undefined,
    isModalOpen: boolean,
    closeModal: () => void,
    updateUserInfo: (userInfo: UserInfo | undefined) => void,
}

export default function UserInfoForm({ useCase, isModalOpen, userInfo, closeModal, updateUserInfo }: Props) {

    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const [supervisors, setSupervisors] = useState<Array<UserInfo>>([]);

    // 提交loading状态
    const [loading, setLoading] = useState(false);

    // 创建、修改用户后，更新用户列表
    const addUserStore = useUserInfoStore((state) => state.addUser);
    const updateUserStore = useUserInfoStore((state) => state.updateUserStore);

    const handleSubmit = () => {
        setLoading(true);
        if (UserFormType.CREATE === useCase) {
            createUser();
        } else {
            updateUser();
        }
    };

    const updateUser = async () => {
        await api.post("/user/update", userInfo)
            .then(response => {
                const { code, message: msg, data } = response.data;
                if (code == SUCCESS_CODE) {
                    messageApi.success('修改成功');
                    updateUserInfo(undefined);
                    updateUserStore(data);
                } else {
                    messageApi.error(msg);
                }
                setLoading(false);
                closeModal();
                form.resetFields();
            }).catch(error => {
                messageApi.error(error);
            });
    }

    const createUser = async () => {
        const user = {
            ...userInfo,
            loginMethod: 'NORMAL_LOGIN',
            userType: "ORDINARY_EMPLOYEES"
        };

        await api.post('/user/create', user)
            .then(response => {
                const { code, message, data } = response.data;
                if (code != SUCCESS_CODE) {
                    messageApi.error(message);
                } else {
                    messageApi.success('创建成功');
                    addUserStore(data);
                    updateUserInfo(undefined);
                }
                setLoading(false);
                closeModal();
                form.resetFields();
            }).catch(error => {
                messageApi.error(error);
            });
    }


    const modalTitle = (useCase: UserFormType) => {
        switch (useCase) {
            case UserFormType.CREATE:
                return "创建普通用户";
            case UserFormType.EDIT:
                return '修改用户';
            case UserFormType.EDIT_PASSWORD:
                return '修改用户密码';
        }
    }



    useEffect(() => {
        api.get("/user/filter", {
            params: {
                page: 1,
                pageSize: 10,
                userType: 'DEPARTMENT_MANAGER'
            }
        }).then(response => {
            const { code, message: msg, data } = response.data;
            if (code == SUCCESS_CODE) {
                const { resultList } = data;
                setSupervisors(resultList);
            } else {

            }
        }).catch(error => {

        });
    }, [])

    if (UserFormType.CREATE !== useCase) {
        form.setFieldsValue(userInfo);
    }

    return (
        <>{contextHolder}
            <Modal title={modalTitle(useCase)}
                open={isModalOpen}
                onCancel={closeModal}
                footer={[
                    <Button
                        key="submit"
                        type='primary'
                        loading={loading}
                        onClick={() => {
                            form.validateFields()
                                .then(values => {
                                    handleSubmit();
                                }).catch((info) => {
                                    console.log(info);
                                })
                        }}
                    >
                        {UserFormType.CREATE === useCase ? '创建普通用户' : '提交修改'}
                    </Button>
                ]}
            >
                <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    style={{ maxWidth: 600 }}
                //initialValues={userInfo}
                >
                    {<Form.Item
                        name="userName"
                        label="用户名"
                        rules={[{ required: true, message: "请输入用户名" }]}
                    >
                        <Input
                            disabled={useCase != UserFormType.CREATE}
                            onChange={(e) => updateUserInfo({
                                ...userInfo,
                                userName: e.target.value
                            })}
                        />
                    </Form.Item>}

                    {(useCase == UserFormType.CREATE || useCase == UserFormType.EDIT_PASSWORD) && <Form.Item
                        name="password"
                        label="登录密码"
                        rules={[{ required: true, message: "请输入登录密码" }]}
                    >
                        <Password
                            onChange={(e) => updateUserInfo({
                                ...userInfo,
                                password: e.target.value
                            })} />
                    </Form.Item>}
                    {(useCase == UserFormType.CREATE || useCase == UserFormType.EDIT) && <Form.Item
                        name="phoneNumber"
                        label="手机号"
                        rules={[{
                            pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                            message: "请输入正确的手机号"
                        }]}
                    >
                        <Input
                            onChange={(e) => updateUserInfo({
                                ...userInfo,
                                phoneNumber: e.target.value
                            })}
                        />
                    </Form.Item>}

                    {(useCase == UserFormType.CREATE || useCase == UserFormType.EDIT) && <Form.Item
                        name="email"
                        label="邮箱"
                        rules={[{
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "请输入正确的邮箱"
                        }]}
                    >
                        <Input
                            onChange={(e) => updateUserInfo({
                                ...userInfo,
                                email: e.target.value
                            })}
                        />
                    </Form.Item>}

                    {(useCase == UserFormType.CREATE || useCase == UserFormType.EDIT) && <Form.Item
                        name="nickName"
                        label="昵称"
                    >
                        <Input
                            onChange={(e) => updateUserInfo({
                                ...userInfo,
                                nickName: e.target.value
                            })}
                        />
                    </Form.Item>}

                    {(useCase == UserFormType.EDIT) && <Form.Item
                        name="status"
                        label="状态"
                    >
                        <Select
                            onChange={(value) => updateUserInfo({
                                ...userInfo,
                                status: value
                            })}
                        >
                            <Option value="NORMAL">正常</Option>
                            <Option value="STOP">停用</Option>
                        </Select>
                    </Form.Item>}

                    {(useCase == UserFormType.CREATE || useCase == UserFormType.EDIT) && <Form.Item
                        name="loginMethod"
                        label="用户来源"
                    >
                        <Input disabled={true}
                            placeholder={"普通登录"}
                        ></Input>
                    </Form.Item>}

                    {
                        (useCase == UserFormType.CREATE || useCase == UserFormType.EDIT) && <Form.Item
                            name="directSupervisorId"
                            label="直属主管"
                        >
                            <Select placeholder="请选择主管"
                                onChange={(value) => updateUserInfo({
                                    ...userInfo,
                                    directSupervisorId: value
                                })}>
                                {supervisors.map(supervisor => (
                                    <Option
                                        key={supervisor.id}
                                        value={supervisor.id}
                                    >
                                        {supervisor.userName}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    }
                </Form >
            </Modal>
        </>
    )
}