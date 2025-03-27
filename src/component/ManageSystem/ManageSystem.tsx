import { Breadcrumb, Flex, Layout, Menu, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import MenuItems from "../List/NavMenu";
import { useState } from "react";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import UserManager from "./UserManager";
import UserDisplay from "./UserDisplay";


const ManageSystem: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [breadCrumbItems, setBreadCrumbItems] = useState<ItemType[]>();

    const handleMenuClick = (event: any) => {
        console.log(event);
    }
    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
            </Header>
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }} collapsible={false}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={MenuItems}
                        onClick={handleMenuClick}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb
                        items={breadCrumbItems}
                        style={{ margin: '16px 0' }}
                    />
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: "#f5f5f5",
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Flex vertical={true}
                            gap={"middle"}>
                            <UserManager />
                            <UserDisplay />
                        </Flex>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default ManageSystem;