import React, { useState,useEffect } from 'react'
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  DashboardOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import '../../custom.css'
import Dashboard from './dashboard'
import ViewList from './viewList'
import ApprovedList from './approvedList'
import RejectedList from './rejectedList'

const { Header, Sider, Content } = Layout;

function AdminArea({ adminType }) {

  const [showSlider, setshowSlider] = useState(false);
  const [showContent, setshowContent] = useState(<Dashboard adminType={ adminType }/>);

  useEffect(() => {
    console.log("adminType",adminType);
    setshowContent(<Dashboard adminType={ adminType }/>);
  }, [adminType])

  const toggleSlider = () => {
    setshowSlider(!showSlider);
  }

  return (
    <>
      <Sider trigger={null} collapsible collapsed={showSlider} style={{ marginTop: '4rem' }}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']} >
          <Menu.Item  key="0"  onClick={toggleSlider}>
            {React.createElement(showSlider ? (MenuUnfoldOutlined) : MenuFoldOutlined, {
              className: 'trigger',

            })}<span>Menu </span>
          </Menu.Item>
          <Menu.Item key="1" icon={<DashboardOutlined />}
          onClick={(e) =>setshowContent(<Dashboard adminType={ adminType }/>)}
          >
           Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<UnorderedListOutlined />}
          onClick={(e) =>setshowContent(<ViewList adminType={ adminType }/>)}
          >
            View All 
          </Menu.Item>
          <Menu.Item key="3" icon={<CheckCircleOutlined />}
          onClick={(e) =>setshowContent(<ApprovedList adminType={ adminType }/>)}
          >
            Approved
          </Menu.Item>
          <Menu.Item key="4" icon={<ExclamationCircleOutlined />}
          onClick={(e) =>setshowContent(<RejectedList adminType={ adminType }/>)}
          >
            Rejected
          </Menu.Item>

          <Menu.Item style={{bottom:'0px'}} key="5" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
          
      </Sider>
      <Content
        className="site-layout-background"
        style={{
          marginTop: '3rem',
          padding: '1rem',
          minHeight: '100vh',
        }}>


        <h1>Admin area</h1>
        <h1>{adminType}</h1>
        <h1>{showContent}</h1>        
      </Content>
    </>
  )
}

export default AdminArea
