import HeaderSection from './components/HeaderSection'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import AadharCard from './components/aadharCard/AadharCard'
import PanCard from './components/panCard/panCard'
import VoterId from './components/voterId/voterId'
import LoginPage from './components/login'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
const { Footer, Content } = Layout;
function App() {


  const getData = () => {
    console.log("sending fetch request");
    axios.post(`/api/sendMessage/`, {
      no: '8888888888',
      message: 'hey how are uou'
    })
      .then(res => {
        console.log(res.data.data);

      });
  }
  useEffect(() => {
    getData();
  }, [])
  return (
    // style={{color:'white',fontSize:'2rem'}}
    <Router>
      <>
        {/* <Layout>
          <HeaderSection />
          <Content className="site-layout" style={{ padding: '1rem 5rem', marginTop: 64, textAlign: 'center' }}> */}
           
            <Switch>
              <Route path="/aadharCard" component={AadharCard}/>
           
              <Route path="/panCard" component={PanCard}/>
              
              <Route path="/voterId" component={VoterId}/>
              
              <Route path="/login" component={LoginPage}/>
                

            </Switch>
          
          {/* </Content>
          <Footer style={{ textAlign: 'center', bottom: '0' }}>©2021 FormEasy</Footer>
        </Layout> */}
      </>
    </Router>
  );
}

export default App;
