import React, { useState } from 'react'
import { Form, Input, Button, Alert } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import '../custom.css'
import HeaderSection from '../components/HeaderSection'
import { Layout, Typography } from 'antd';

// import { Layout, Menu } from 'antd';
import {
    UserOutlined,
} from '@ant-design/icons';
// import useState from 'react-usestateref'

// const { Footer, Header, Sider, Content } = Layout;

const { Footer, Content } = Layout;
const { Title } = Typography;



const credential = [
    {
        type: "aadharAdmin",
        username: "aadhar",
        password: "aadhar",
        dbName: "aadharCardData"
    },
    {
        type: "panAdmin",
        username: "pan",
        password: "pan",
        dbName: "panCardData"
    },
    {
        type: "voterIdAdmin",
        username: "voter",
        password: "voter",
        dbName: "voterIdData"

    },
    // {
    //     type: "super",
    //     username: "super",
    //     password: "super",
    //     dbName: "all"
    // }
    // ,
    // {
    //     type: "admin",
    //     username: "admin",
    //     password: "admin"
    // }
]



function filter(array, value, key) {
    return array.filter(key
        ? credential => credential[key] === value
        : credential => Object.keys(credential).some(k => credential[k] === value)
    );
}


function LoginPage({ setUser, setAdminType, setAdminDbName, setDataToLocalStorage }) {

    const [showError, setshowError] = useState(false);



    const dataToLocalStorage = (result) => {
        return new Promise((resolve, reject) => {
            localStorage.setItem('user', JSON.stringify({
                userName: result.username,
                dbName: result.dbName,
                adminType: result.type
            }))
            setDataToLocalStorage(true);
            resolve("data saved to local storage")
        })
    }


    const guestLogin = (guestLoginUserName) => {

        const result = credential.filter((user) => user.username === guestLoginUserName)[0];
        // console.log(result)
        setUser({ userName: result.username })
        setAdminType(result.type);
        setAdminDbName(result.dbName);

        dataToLocalStorage(result).then((data) => {
            console.log("data::", data);

        });

    }



    const error = <Alert
        message="user name or password was incorrect!"
        type="error"
        closable
    />


    const onFinish = (values) => {

        let result = filter(credential, values.username, 'username')[0];
        console.log('result', result)
        if (!result) {
            setshowError(true);
            alertTimeout();
        }
        if (result.username === values.username && result.password === values.password) {
            if (result.username === "admin") {
                console.log("this is admin");

                // localStorage.setItem('user', JSON.stringify({ userName: result.username}))
            }
            else {
                console.log(result.type);
                console.log("pass", result.dbName);
                setUser({ userName: result.username })
                setAdminType(result.type);
                setAdminDbName(result.dbName);


                dataToLocalStorage(result).then((data) => {
                    console.log("data::", data);

                })
            }

        } else {
            console.log("fail");
            setshowError(true);
            alertTimeout();
        }
    };
    const alertTimeout = () => {
        setTimeout(() => {
            console.log("1 sec");
            setshowError(false);
        }, 3000);
    }
    return (
        <>
            <Layout>
                <HeaderSection style={{ padding: 0 }} />


                <Layout>



                    <>
                        <Content className="site-layout" style={{ padding: '1rem 5rem', marginTop: 64, textAlign: 'center' }}>
                            <div className="login-container">
                                <Title>Login Here</Title>
                                {showError ? error : <></>}
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
                                    {/* <Form.Item>
                                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                                    <Checkbox>Remember me</Checkbox>
                                                </Form.Item>
                                            </Form.Item> */}

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            Log in
                                        </Button>

                                    </Form.Item>
                                </Form>

                                <Button type="secondary" onClick={() => guestLogin(credential[0].username)}>
                                    Guest aadhar admin
                                </Button>

                                <Button type="secondary" onClick={() => guestLogin(credential[1].username)}  style={{
                                    marginTop: "0.5rem",
                                }}>

                                    Guest pan admin
                                </Button>

                                <Button type="secondary"  onClick={() => guestLogin(credential[2].username)} style={{
                                    marginTop: "0.5rem"
                                }}>
                                    Guest voter admin
                                </Button>

                            </div>
                        </Content>
                    </>






                </Layout>
                <Footer style={{ textAlign: 'center', bottom: '0px' }}>©2021 FormEasy</Footer>
            </Layout>




        </>
    )

}
export default LoginPage
