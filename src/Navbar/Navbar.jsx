import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

const { Header, Sider, Content } = Layout;
import './Navbar.scss'
import { Link, Outlet } from 'react-router-dom'
const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
       <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon:  <Link className='nav-link' to={'/city'}>City</Link>,
              // label: ',
            },
            {
              key: '2',
              icon:    <Link className='nav-link' to={'/car'}>Cars</Link>,
              // label: 'nav 2',
            },
            {
              key: '3',
              icon:   <Link className='nav-link' to={'/loc'}>Location</Link>,
              // label: ,
            },
            {
              key: '4',
              icon:  <Link className='nav-link' to={'/caregory'}>Category</Link>,
              // label: ',
            },
            {
              key: '5',
              icon:   <Link className='nav-link' to={'/model'}>Model</Link>,
              // label: 'nav 2',
            },
            {
              key: '6',
              icon:   <Link className='nav-link' to={'/brend'}>Brend</Link>,
              // label: 'nav 2',
            },
      
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
        
        </Content>
      </Layout>
    </Layout>

    </>
  )
}

export default Navbar
