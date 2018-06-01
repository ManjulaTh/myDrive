import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar/Navbar'
import Modal from './components/Modal/Modal'
import HomeContainer from './containers/Home/Home'
import TrashContainer from './containers/Trash/Trash'

import New from './img/new.jpg'
import MyDrive from './img/myDrive.png'
import StorageDrive from './img/storageDrive.jpg'
import Trash from './img/trash.jpg'

class App extends Component {
  state = {
    links: [
      { name: 'Home', url: '/' },
      // { name: 'DriveStorage', url: '/driveStorage' },
      { name: 'Trash', url: '/trash' },
      {
        name: 'New',
        dataToggle: 'modal',
        dataTarget: '#newModal',
        url: '#newModal'
      }
    ],

    buttons: [
      { title: 'DriveStorage', image: StorageDrive },
      { title: 'NEW', image: New },
      { title: 'My Drive', image: MyDrive },
      { title: 'Trash', image: Trash }
    ]
  }
  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="d-flex shadow p-3 ml-5 mr-5 bg-white rounded"
            style={{ width: "90%", height: "700px" }}>
            <Navbar
              links={Object.values(this.state.links)}
              buttons={Object.values(this.state.buttons)}
            />
            {/*<Modal /> */}
            <Switch>
              {/* <Route path='/driveStorage' component={HomeContainer} /> */}
              <Route path='/trash' component={TrashContainer} />
              <Route path='/' component={HomeContainer} />
            </Switch>
          </div>
        </div>
      </Fragment>
    )
  }
}


export default App;
