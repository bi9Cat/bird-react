import { Breadcrumb, Layout, Menu, MenuProps } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import MenuItems from "./NavMenu";
import { useEffect, useState } from "react";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import Main from "./Main";
import { To, useLocation, useNavigate } from "react-router";
import styles from "./home.module.css";
import React from "react";
import { SubMenuType } from "antd/es/menu/interface";

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
    items: MenuProps["items"] | undefined
  ): ItemType[] => {
    if (path === "/" || !items) {
      return [{ title: "首页看板" }];
    }
    for (const item of items) {
      if (!item) {
        continue;
      }
      const i = item as SubMenuType;
      if (i.key === path) {
        return [
          {
            title: i.label,
          },
        ];
      }
      if (i.children) {
        const result = findBreadcrumbPaths(path, i.children);
        if (result.length > 0) {
          return [{ title: i.label }, ...result];
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
