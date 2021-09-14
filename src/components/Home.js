import React, { useState } from 'react';

import { Layout, Button, Affix } from 'antd';
import SS from '../screenshots/FormEasy.png'

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
                            Currently this Whatsapp bot disabled!
                        </p>
                    </Affix>
                    <div className="container"
                        style={{
                            display: "flex",
                            minHeight: "90vh",
                            minWidth: "95vw"
                        }}
                    >
                        <div
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
                                Whatsapp bot  to fill aadharCard , PAN card, VoterId forms
                            </h2>
                            <Button type="primary" shape="round">
                                Chat now
                            </Button>
                        </div>
                        <div
                            style={{
                                minWidth: "50vw",
                                minHeight: "100%",
                                alignSelf: "center",
                                justifyContent: "center",
                                paddingLeft: "6rem"
                            }}
                        >
                            <img src={SS} alt="formeasy-home" width="300px" height="500px" />
                        </div>

                    </div>
                </Content>

            </Layout>
        </>
    )
}

export default Home
