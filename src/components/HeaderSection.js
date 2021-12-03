import React from 'react'
import { Layout } from 'antd';
const { Header } = Layout;
function HeaderSection() {
  return (
    <>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', color: 'white', fontSize: '2rem' }}>
        <div className="logo" />
        <a href="/" style={{
          textDecoration:"none",
          color:"white"
        }}>
          FormEasy
        </a>

      </Header>
    </>
  )
}

export default HeaderSection
