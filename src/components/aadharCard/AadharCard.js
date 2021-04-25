import React, { useState, useEffect } from 'react'
import Data from './aadharData'
import { Button } from 'antd';
import HeaderSection from '../HeaderSection'
import { Layout } from 'antd';
import AadharCardForm from './AadharCardForm'
const { Footer, Content } = Layout;

function AadharCard({ match }) {

    useEffect(() => {
        // console.log("match",match.params.id);
    }, []);
    const [showAadharForm, setShowAadharForm] = useState(false);
    const toggleForm = () => {
        setShowAadharForm(true);
    }

    return (
        <>
            <Layout>
                <HeaderSection />
                <Content className="site-layout" style={{ padding: '1rem 5rem', marginTop: 64, textAlign: 'center' }}>
                    {
                        !showAadharForm ? (
                            <>
                                <Data />
                                <br></br>
                                <div style={{textAlign:'center'}}>
                                    <Button type="primary" onClick={toggleForm} style={{ margin: '2rem' }}>Fill the Form</Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <AadharCardForm senderId={match.params.id} />
                            </>
                        )
                    }
                </Content>
                <Footer style={{ textAlign: 'center', bottom: '0' }}>©2021 FormEasy</Footer>
            </Layout>

        </>
    )
}

export default AadharCard
