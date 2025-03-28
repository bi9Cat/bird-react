import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import MenuItems from "./NavMenu";
import { useEffect, useState } from "react";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import Main from "./Main";
import { useLocation, useNavigate } from "react-router";


const Home: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();
    const location = useLocation();
    const selectedKey = location.pathname;
    const [breadCrumbItems, setBreadCrumbItems] = useState<ItemType[]>();

    const handleMenuClick = (event: any) => {
        navigate(event.key);
    }

    const findBreadcrumbPaths = (path: string, items: any[] | undefined): ItemType[] => {
        if (path == '/' || !items) {
            return [{ title: '首页看板' }]
        }
        for (const item of items) {
            if (item.key === path) {
                return [{
                    title: item.label
                }];
            }
            if (item.children) {
                const result = findBreadcrumbPaths(path, item.children);
                if (result.length > 0) {
                    return [{ title: item.label }, ...result];
                }
            }
        }
        return [];
    };

    useEffect(() => {
        setBreadCrumbItems(findBreadcrumbPaths(selectedKey, MenuItems));
    }, [selectedKey, MenuItems]);

    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
            </Header>
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }} collapsible={false}>
                    <Menu
                        mode="inline"
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
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Main />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Home;