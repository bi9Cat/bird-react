import { Breadcrumb, Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import MenuItems from "./NavMenu";
import { useEffect, useState } from "react";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import Main from "./Main";
import { To, useLocation, useNavigate } from "react-router";
import styles from "./home.module.css";
import React from "react";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedKey = location.pathname;
  const [breadCrumbItems, setBreadCrumbItems] = useState<ItemType[]>();

  const handleMenuClick = (event: { key: To }) => {
    navigate(event.key);
  };

  const findBreadcrumbPaths = (
    path: string,
    items: ItemType[] | undefined
  ): ItemType[] => {
    if (path === "/" || !items) {
      return [{ title: "首页看板" }];
    }
    for (const item of items) {
      if (item.key === path) {
        return [
          {
            title: item.label,
          },
        ];
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
      <Header className={styles.header}>
        <div />
      </Header>
      <Layout>
        <Sider className={styles.sider} collapsible={false}>
          <Menu
            className={styles.menu}
            mode="inline"
            items={MenuItems}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout className={styles.layout}>
          <Breadcrumb className={styles.breadcrumb} items={breadCrumbItems} />
          <Content className={styles.content}>
            <Main />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;
