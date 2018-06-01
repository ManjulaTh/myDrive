import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar/Navbar'
import Modal from './components/Modal/Modal'
import MyDriveContainer from './containers/MyDrive/MyDrive'
import TrashContainer from './containers/Trash/Trash'

import New from './img/new.jpg'
import MyDrive from './img/myDrive.png'
import StorageDrive from './img/storageDrive.jpg'
import Trash from './img/trash.jpg'

class App extends Component {
  state = {
    links: [
      { name: 'DriveStorage', url: '/', title: 'DriveStorage', image: StorageDrive },
      {
        name: 'New',
        dataToggle: 'modal',
        dataTarget: '#newModal',
        url: '#newModal',
        title: 'NEW',
        image: New
      },
      { name: 'MyDrive', url: '/', title: 'My Drive', image: MyDrive },
      { name: 'Trash', url: '/trash', title: 'Trash', image: Trash }
    ],
    modalButtons: [
      { name: 'Folder' },
      { name: 'File' }
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
            // buttons={Object.values(this.state.buttons)}
            />
            <Modal />
            <Switch>
              {/* <Route path='/driveStorage' component={HomeContainer} /> */}
              <Route path='/trash' component={TrashContainer} />
              <Route path='/' component={MyDriveContainer} />
            </Switch>
          </div>
        </div>
      </Fragment>
    )
  }
}


export default App;
