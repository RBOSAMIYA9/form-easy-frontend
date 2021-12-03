import React, { useState } from 'react';

import { Layout, Button, Affix, Row, Col } from 'antd';
// import SS from '../screenshots/FormEasy.png'

const { Content } = Layout;
function Home() {

    // eslint-disable-next-line
    const [top, setTop] = useState(0);
    return (
        <>



            <Layout >

                <Content
                    className="site-layout-background"
                    style={{

                        minHeight: "100vh",
                        minWidth: "100vw",
                        margin: 0,
                        padding: 0,
                        backgroundColor: "#ECF3FC"


                    }}
                >
                    <Affix offsetTop={top}>
                        <p style={{
                            textAlign: "center",
                            backgroundColor: "#c9e6ff",
                            padding: "0.2rem"
                        }}>
                            <b>Currently this Whatsapp bot disabled! </b>Are you  admin ? <a href="/dashboard">
                                <u>Login here</u>
                            </a>
                        </p>

                    </Affix>
                    <Row align="middle">
                       
                        <Col flex={4} style={{padding:"1.5rem"}}  >
                            <h1
                                style={{
                                    fontSize: "3rem",
                                    color: "#5F9BF1",
                                    marginBottom: "0px"
                                }}
                            >FormEasy</h1>
                            <h2>
                                Whatsapp bot  to fill aadharCard, PAN card, VoterId forms
                            </h2>
                            <div
                                style={{
                                    margin: "1rem"
                                }}
                            >
                                <Button type="primary" shape="round">
                                    Chat now
                                </Button>
                            </div>


                            <Row>
                                <Col flex={4} style={{ marginTop: "1rem" }}>
                                    <a href="/aadharCard/8888888888">
                                        <Button type="primary" shape="round">
                                            Fill AadharCard Form
                                        </Button>

                                    </a>
                                </Col>


                                <Col flex={4} style={{ marginTop: "1rem" }}>
                                    <a href="/panCard/8888888888">
                                        <Button type="primary" shape="round">
                                            Fill PanCard Form
                                        </Button>
                                    </a>
                                </Col>

                                <Col flex={4} style={{ marginTop: "1rem" }} >
                                    <a href="/voterId/8888888888">
                                        <Button type="primary" shape="round">
                                            Fill VoterId Form
                                        </Button>
                                    </a>

                                </Col>

                            </Row>


                        </Col>
                        <Col flex={3}>
                            <video width="300px" height="500px" autoplay="autoplay" muted loop>
                                <source src="https://user-images.githubusercontent.com/27606753/144578902-9b14dc56-9056-4650-942f-4d25f0ecbcc1.mp4" type="video/mp4" />
                            </video>
                        </Col>
                    </Row>
                    {/* <div className="container"
                        style={{
                            display: "flex",
                            minHeight: "90vh",
                            minWidth: "95vw"
                        }}
                    > */}
                    {/* <div
                            style={{
                                minWidth: "50%",
                                minHeight: "100%",
                                alignSelf: "center",
                                // backgroundColor: "red",
                                padding: "2rem"
                            }}
                        >

                            <h1
                                style={{
                                    fontSize: "3rem",
                                    color: "#5F9BF1",
                                    marginBottom: "0px"
                                }}
                            >FormEasy</h1>
                            <h2>
                                Whatsapp bot  to fill aadharCard, PAN card, VoterId forms
                            </h2>
                            <div
                                style={{
                                    margin: "1rem"
                                }}
                            >
                                <Button type="primary" shape="round">
                                    Chat now
                                </Button>
                            </div>


                            <Row>
                                <Col flex={4} style={{ marginTop: "1rem" }}>
                                    <a href="/aadharCard/8888888888">
                                        <Button type="primary" shape="round">
                                            Fill AadharCard Form
                                        </Button>

                                    </a>
                                </Col>


                                <Col flex={4} style={{ marginTop: "1rem" }}>
                                    <a href="/panCard/8888888888">
                                        <Button type="primary" shape="round">
                                            Fill PanCard Form
                                        </Button>
                                    </a>
                                </Col>

                                <Col flex={4} style={{ marginTop: "1rem" }} >
                                    <a href="/voterId/8888888888">
                                        <Button type="primary" shape="round">
                                            Fill VoterId Form
                                        </Button>
                                    </a>

                                </Col>

                            </Row>





                        </div> */}
                    {/* <div
                            style={{
                                minWidth: "50vw",
                                minHeight: "100%",
                                alignSelf: "center",
                                justifyContent: "center",
                                paddingLeft: "6rem"
                            }}
                        >
                            
                            <video width="300px" height="500px" autoplay="autoplay" muted loop>
                                <source src="https://user-images.githubusercontent.com/27606753/144578902-9b14dc56-9056-4650-942f-4d25f0ecbcc1.mp4" type="video/mp4" />
                            </video>
                        </div> */}

                    {/* </div> */}
                </Content>

            </Layout>
        </>
    )
}

export default Home
