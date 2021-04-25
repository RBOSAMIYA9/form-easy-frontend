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

const {  Sider, Content } = Layout;

function AdminArea({ adminType ,adminDbName}) {

  const [showSlider, setshowSlider] = useState(true);
  const [showContent, setshowContent] = useState(<Dashboard adminType={ adminType }/>);

  useEffect(() => {
    console.log("adminType",adminType);
    console.log("adminDbName",adminDbName);
    setshowContent(<Dashboard adminType={ adminType } adminDbName={adminDbName}/>);
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
          onClick={(e) =>setshowContent(<Dashboard adminType={ adminType }  adminDbName={adminDbName}/>)}
          >
           Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<UnorderedListOutlined />}
          onClick={(e) =>setshowContent(<ViewList adminType={ adminType } adminDbName={adminDbName}/>)}
          >
            View All 
          </Menu.Item>
          <Menu.Item key="3" icon={<CheckCircleOutlined />}
          onClick={(e) =>setshowContent(<ApprovedList adminType={ adminType } adminDbName={adminDbName}/>)}
          >
            Approved
          </Menu.Item>
          <Menu.Item key="4" icon={<ExclamationCircleOutlined />}
          onClick={(e) =>setshowContent(<RejectedList adminType={ adminType } adminDbName={adminDbName}/>)}
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
        <h1 style={{textAlign:'center'}}>{showContent}</h1>        
      </Content>
    </>
  )
}

export default AdminArea
