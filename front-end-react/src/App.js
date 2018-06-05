import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'

import axios from 'axios'

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
    folders: [],
    files: [],
    // {
    //   folderId: '',
    //   folderName: 'FolderName',
    //   files: [{
    //     fileId: '',
    //     fileName: 'FileName',
    //     trash: false
    //   }],
    //   trash: true,
    // },
    // {
    //   folderId: '',
    //   folderName: 'DeletedFolderName',
    //   files: [{
    //     fileName: 'DeletedFileName',
    //     fileId: '',
    //     trash: true
    //   }],
    //   trash: true,
    // }

    selectedFileUpload: null,
    selectedFolderFileIdUpload: null,
    selectedFolderNameUpload: null
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/folders/all')
      .then(response => {
        console.log(response.data)
        this.setState({ folders: response.data })
        console.log(this.state.folders)
        console.log(`state = ${this.state.folders}`)
      })
  }

  selectedFileUploadHandler = event => {
    this.setState({
      selectedFileUpload: event.target.files[0]
    })
  }

  selectedFileFolderIdHandler = event => {
    this.setState({
      selectedFolderFileIdUpload: event.target.value
    })
  }

  selectedFolderNameUpload = event => {
    this.setState({
      selectedFolderNameUpload: event.target.value
    })
  }

  fileUploadHandler = () => {
    // if (this.state.selectedFileUpload) {
    //   const formData = new FormData()
    //   formData.append('file', this.state.selectedFileUpload)
    //   formData.append('folderId', this.state.selectedFolderFileIdUpload)
    //   axios.post('http://localhost:8080/api/files/create', formData, {
    //     'Content-Type': 'multipart/form-data'
    //   })
    //     .then(response => {
    //       this.fileInput.value = null
    //       this.setState({
    //         selectedFileUpload: null,
    //         files: [...this.state.files, response.data]
    //       })
    //     })
    // }
  }

  folderUploadHandler = () => {
    // console.log('It was click.')
    // console.log(this.state.selectedFolderNameUpload)
    // if (this.state.selectedFolderNameUpload) {
    //   axios.post('http://localhost:8080/api/folders/create', this.state.selectedFolderNameUpload)
    //     .then(response => {
    //       this.folderNameInput.value = null
    //       this.setState({
    //         selectedFolderNameUpload: null,
    //         folders: [...this.state.folders, response.data]
    //       })
    //     })
    // }
  }
  render() {
    { console.log('from app', this.state.folders) }
    return (
      <Fragment>
        <div className="container">
          <div className="d-flex shadow p-3 ml-5 mr-5 bg-white"
            style={{ width: "90%", height: "700px" }}>
            <Navbar
              links={this.state.links}
            />
            <Modal
            // newFolderClicked={this.modalCreateNewFolderHandler}
            // newFileClicked={this.modalCreateNewFileHandler}
            />
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
            <input type='number' />
          </div>
        </div>
      </Fragment>
    )
  }
}


export default App;
