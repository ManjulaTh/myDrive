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
      { name: 'DriveStorage', url: '/', title: 'DriveStorage', image: StorageDrive, pillId: 'DriverStoragePill' },
      {
        name: 'New',
        dataToggle: 'modal',
        dataTarget: '#newModal',
        url: '#newModal',
        title: 'NEW',
        image: New,
        piiId: 'NewPill'
      },
      { name: 'MyDrive', url: '/', title: 'My Drive', image: MyDrive, pillId: 'MyDrivePill' },
      { name: 'Trash', url: '/trash', title: 'Trash', image: Trash, pillId: 'TrashPill' }
    ],
    folders: [
      {
        folderName: 'FolderName',
        folderId: '',
        trash: true,
        files: [{
          fileName: 'FileName',
          fileId: '',
          trash: false,
          folderId: ''
        }]
      },
      {
        folderName: 'DeletedFolderName',
        folderId: '',
        trash: true,
        files: [{
          fileName: 'DeletedFileName',
          fileId: '',
          trash: true,
          folderId: ''
        }]
      }
    ]

  }




  render() {
    { console.log(this.state.folders) }
    return (
      <Fragment>
        <div className="container">
          <div className="d-flex shadow p-3 ml-5 mr-5 bg-white"
            style={{ width: "90%", height: "700px" }}>
            <Navbar
              links={this.state.links}
            />
            <Modal />
            <Switch>
              {/* <Route path='/driveStorage' component={HomeContainer} /> */}
              <Route
                path='/trash'
                render={() => <TrashContainer folders={this.state.folders} />}
              /><Route
                path='/'
                render={() => <MyDriveContainer folders={this.state.folders} />}
              />
            </Switch>
          </div>
        </div>
      </Fragment>
    )
  }
}


export default App;
