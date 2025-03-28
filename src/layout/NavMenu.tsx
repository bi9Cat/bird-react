import React from 'react';
import { AlertOutlined, BarChartOutlined, ClusterOutlined, DeploymentUnitOutlined, FundOutlined, LaptopOutlined, SnippetsOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

export const MenuItems: MenuProps['items'] = [
    {
        key: '/Dashboard',
        icon: <BarChartOutlined />,
        label: '首页看板',
    },
    {
        key: '/Schedule',
        icon: <LaptopOutlined />,
        label: '排班管理',
    },
    {
        key: '/Product',
        icon: <SnippetsOutlined />,
        label: '生产管理',
    },
    {
        key: '/Attendance',
        icon: <FundOutlined />,
        label: '考勤管理',
    },
    {
        key: '/Permission',
        icon: <AlertOutlined />,
        label: '权限管理',
        children: [
            {
                key: '/Permission/OrgManage',
                label: "组织管理",
                icon: <ClusterOutlined />
            },
            {
                key: '/Permission/RoleManage',
                label: '角色管理',
                icon: <TeamOutlined />
            },
            {
                key: '/Permission/UserManage',
                label: '用户管理',
                icon: <UserOutlined />
            },
            {
                key: '/Permission/AuthManage',
                label: '权限管理',
                icon: <DeploymentUnitOutlined />
            }
        ],
    }

];

export default MenuItems;