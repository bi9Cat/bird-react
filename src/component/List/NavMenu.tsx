import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { Collapse, MenuProps } from 'antd';

const MenuItems: MenuProps['items'] = [{
    key: `sub1`,
    icon: React.createElement(LaptopOutlined),
    label: `权限管理`,
    children: [{
        key: `subKey1`,
        label: `用户管理`,
    }],
}];

export default MenuItems;