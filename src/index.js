import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import Appointment from './Appointment';
import ParentToast from './ParentToast';
import Toast from './Toast';
import ParentComp from './ParentComp';
import Chat from './Chat';
import Notification from './Notification';
import { HashRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import DoctorHome from './DoctorHome';
import PatientHome from './PatientHome';
import Sidemenu from './SidemenuTest';
import Lander from './Lander';
import { Provider } from 'react-redux'

import { loginStore } from './reducer/loginReducer';

// WebRTC https://github.com/js-platform/p2p

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      loggedIn: true
    };

  }
  componentDidMount() {
    if (!this.state.loggedIn) {
      location.href = '#/lander';
    }
    loginStore.subscribe(() => {
      const loggedIn = loginStore.getState().loggedIn;
      if (this.state.loggedIn == loggedIn) return;
      this.setState({ loggedIn });
      console.log('index.js -- login -- ', loginStore.getState());
      if (loggedIn) {
        location.href = '#/doctorhome';
      } else {
        location.href = '#/lander';
      }
    })
  }
  render() {
    return (
      <div>
        <Provider store={loginStore}>
          {this.state.loggedIn && <Sidemenu />}
          <Router>

            <Route component={Lander} path="/lander" />
            <Route component={DoctorHome} path="/doctorhome" />
            <Route component={PatientHome} path="/patienthome" />
            <Route component={Chat} path="/chat/:roomId" />
            <Route component={Appointment} path="/appointment" />

            <Route component={Notification} path='/notification' />
          </Router>
          <Toast path="/toast" />
        </Provider>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
