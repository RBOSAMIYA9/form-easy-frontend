
import { useState } from 'react'

import 'antd/dist/antd.css';
import AadharCard from './components/aadharCard/AadharCard'
import PanCard from './components/panCard/panCard'
import VoterId from './components/voterId/voterId'
import DashboardPage from './components/DashboardPage'
import Home from './components/Home'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
// const { Footer, Content } = Layout;
function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));


  // const getData = () => {
  //   console.log("sending fetch request");
  //   axios.post(`/api/sendMessage/`, {
  //     no: '8888888888',
  //     message: 'hey how are uou'
  //   })
  //     .then(res => {
  //       console.log(res.data.data);

  //     });
  // }
  // useEffect(() => {
  //   // getData();
  // }, [])
  return (
    // style={{color:'white',fontSize:'2rem'}}
    <Router>
      <>
        {/* <Layout>
          <HeaderSection />
          <Content className="site-layout" style={{ padding: '1rem 5rem', marginTop: 64, textAlign: 'center' }}> */}

        <Switch>
          <Route path="/aadharCard/:id" component={AadharCard} />

          <Route path="/panCard/:id" component={PanCard} />

          <Route path="/voterId/:id" component={VoterId} />

          <Route exact path="/dashboard" >
            <DashboardPage user={user} setUser={setUser} />

          </Route>
          <Route exact path="/" >
            <Home />
          </Route>
         
        </Switch>

        {/* </Content>
          <Footer style={{ textAlign: 'center', bottom: '0' }}>©2021 FormEasy</Footer>
        </Layout> */}
      </>
    </Router>
  );
}

export default App;
