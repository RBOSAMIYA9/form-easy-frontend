import React ,{useState , useEffect} from 'react'
import Data from './panCardData'
import { Button } from 'antd';
import PanCardForm from './panCardForm'
import { Layout } from 'antd';
import HeaderSection from '../HeaderSection'


const { Footer, Content } = Layout;


function PanCard({match}) {

    useEffect(() => {
        // console.log("match",match.params.no);
    }, []);
    const [showPanForm, setShowPanForm] = useState(false);
    const toggleForm = () => {
        setShowPanForm(true);
    }
    
    return (
        <>  
         <Layout>
                <HeaderSection />
                <Content className="site-layout" style={{ padding: '1rem 5rem', marginTop: 64, textAlign: 'center' }}>
            {
                !showPanForm?(
                    <>
                    <Data/>
                        <br></br>
                    <Button type="primary" onClick={toggleForm} style={{ margin: '2rem' }}>Fill the Form</Button>
            
                    </>
                ):(
                    <>
                       <PanCardForm/>
                    </>
                )
            }
            </Content>
          <Footer style={{ textAlign: 'center', bottom: '0' }}>©2021 FormEasy</Footer>
        </Layout>
            
        </>
    )
}

export default PanCard
