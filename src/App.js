import logo from './logo.svg';
import './App.css';
import Canvas from './components/canvas';
import textItem from './components/actionItems/textItem';

import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { Button } from 'antd';
import React from 'react';
const { Header, Content, Footer, Sider } = Layout;


const items: MenuProps["items"] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined
].map((icon, index) => (
    {
      key: String(index + 1),
      icon: React.createElement(icon),
      label: `nav ${index + 1}`,
    title: 'other data',
    }
));

const onClick = (info, canvas) => {
    console.log('click called', info, canvas)
    // console.log( canvas.current.getActiveObject() );
    textItem({ canvas }).onAdd();
};

function App() {

    const canvas = React.useRef(null);
    // console.log( canvas.current.getActiveObject() );
  return (
    <div className="App">
      <Layout hasSider>
        <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 0,
              bottom: 0
            }}
        >
          <div className="logo" />
          <Menu
              theme="dark"
              mode="inline"
              onClick={(info) => { onClick(info, canvas) } }
              defaultSelectedKeys={["4"]}
              items={items}
          />
        </Sider>

        <Layout
            className="site-layout"
            style={{ marginLeft: 200, marginRight: 200 }}
        >
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div
                className="site-layout-background"
                style={{ padding: 24, textAlign: "center" }}
            >
              <p>long content</p>
                <Canvas canvas={canvas} />
              {
                // indicates very long content
                Array.from({ length: 100 }, (_, index) => (
                    <React.Fragment key={index}>
                      {index % 20 === 0 && index ? "more" : "..."}
                      <br />
                    </React.Fragment>
                ))
              }
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>

        <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              right: 0,
              top: 0,
              bottom: 0
            }}
        >
          <div className="logo" />
          <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["4"]}
              items={items}
          />
        </Sider>
      </Layout>
    </div>
  );
}

export default App;
