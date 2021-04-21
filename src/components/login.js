import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import AdminArea from '../components/admin/adminArea'
import '../custom.css'
import HeaderSection from '../components/HeaderSection'
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

const { Footer, Header, Sider, Content } = Layout;



const credential = [
    {
        type: "aadharAdmin",
        username: "aadharAdmin",
        password: "aadharPassword"
    },
    {
        type: "panAdmin",
        username: "panAdmin",
        password: "panPassword"
    },
    {
        type: "voterIdAdmin",
        username: "voterIdAdmin",
        password: "voterIdPassword"
    },
    {
        type: "super",
        username: "super",
        password: "super"
    },
    {
        type: "admin",
        username: "admin",
        password: "admin"
    }
]



function filter(array, value, key) {
    return array.filter(key
        ? credential => credential[key] === value
        : credential => Object.keys(credential).some(k => credential[k] === value)
    );
}
function Login() {
    const [showAdminArea, setshowAdminArea] = useState(false);
    const [adminType, setAdminType] = useState(null)
    const [showError, setshowError] = useState(false)

    const error = <Alert
    message="user name or password was incorrect!"
    type="error"
    closable
    />
    
    
    const onFinish = (values) => {
        // console.log('Received values of form: ', values);

        // console.log(filter(credential, values.username, 'username'));
        console.log(showError);
        let result = filter(credential, values.username, 'username')[0];
        if(!result){
            setshowError(true);
            alertTimeout();
        }
        if (result.username === values.username && result.password === values.password) {
            console.log(result.type);
            console.log("pass");
            setshowAdminArea(true);
            setAdminType(result.type, () => console.log("adminType state", adminType));
        } else {
            console.log("fail");
            setshowError(true);
            alertTimeout();
        }
    };
    const alertTimeout =()=>{
        setTimeout(() => {
            console.log("1 sec");
            setshowError(false);
        }, 3000);
    }
    return (
        <>
            <Layout>
                <HeaderSection style={{ padding: 0 }} />

                {/* <Header className="site-layout-background" style={{ padding: 0 }}>
                        
                </Header> */}
                <Layout>

                    {showAdminArea ? (
                        <>
                            <AdminArea adminType={adminType} />
                        </>
                    ) : (
                        <Content className="site-layout" style={{ padding: '1rem 5rem', marginTop: 64, textAlign: 'center' }}>
                            <div className="login-container">
                                <h1>Login Here</h1>
                                {showError ? error: <></>}
                                <Form
                                    // style={{padding:'0 5rem 0 5rem'}}
                                    name="normal_login"
                                    className="login-form"
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                >
                                    <Form.Item
                                        name="username"
                                        rules={[{ required: true, message: 'Please input your Username!' }]}
                                    >
                                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        rules={[{ required: true, message: 'Please input your Password!' }]}
                                    >
                                        <Input
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Form.Item name="remember" valuePropName="checked" noStyle>
                                            <Checkbox>Remember me</Checkbox>
                                        </Form.Item>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            Log in
                                        </Button>

                                    </Form.Item>
                                </Form>
                            </div>
                        </Content>
                    )
                    }

                </Layout>
                <Footer style={{ textAlign: 'center', bottom: '0px' }}>©2021 FormEasy</Footer>
            </Layout>




        </>
    )
}

export default Login
