import React ,{useState , useEffect} from 'react'
import Data from './voterIdData'
import { Button } from 'antd';
import VoterIdForm from './voterIdForm'
import { Layout } from 'antd';
import HeaderSection from '../HeaderSection'


const { Footer, Content } = Layout;


function VoterId() {
    
    useEffect(() => {
        // console.log("match",match.params.no);
    }, []);
    const [showVoterIdForm, setVoterIdForm] = useState(false);
    const toggleForm = () => {
        setVoterIdForm(true);
    }

    return (
        <>
             <Layout>
                <HeaderSection />
                <Content className="site-layout" style={{ padding: '1rem 5rem', marginTop: 64, textAlign: 'center' }}>
             {
                !showVoterIdForm?(
                    <>
                    <Data/>
                        <br></br>
                    <Button type="primary" onClick={toggleForm} style={{ margin: '2rem' }}>Fill the Form</Button>
            
                    </>
                ):(
                    <>
                       <VoterIdForm/>
                    </>
                )
            }
            </Content>
          <Footer style={{ textAlign: 'center', bottom: '0' }}>©2021 FormEasy</Footer>
        </Layout>
        </>
    )
}

export default VoterId
