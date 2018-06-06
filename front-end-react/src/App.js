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
    mydriveFolders: [],
    mydriveFiles: [],
    trashFolders: [],
    trashFiles: [],
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

    selectedFileUpload: '',
    selectedFile: '',
    selectedFolderFileIdUpload: null,
    selectedFolderNameUpload: null,
    currentFolderId: 0,
    currentFileId: null
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/folders/all')
      .then(response => {
        this.setState({ mydriveFolders: response.data })
        console.log(`state-mydriveFolders = ${this.state.mydriveFolders}`)
      })
    axios.get('http://localhost:8080/api/files/all')
      .then(response => {
        this.setState({ mydriveFiles: response.data })
        console.log(`state-mydriveFiles = ${this.state.mydriveFiles}`)
      })
    axios.get('http://localhost:8080/api/folders/all?trash=true')
      .then(response => {
        this.setState({ trashFolders: response.data })
        console.log(`state-trashFolders = ${this.state.trashFolders}`)
      })
    axios.get('http://localhost:8080/api/folders/all?trash=true')
      .then(response => {
        this.setState({ trashFiles: response.data })
        console.log(`state-trashFiles = ${this.state.trashFiles}`)
      })
  }

  selectedFileUploadHandler = event => {
    console.log('asjdlkfjlsdaknvlkdsjklvndslkjvlkdsjklv;nsdlk;j: ', event.target.files)
    this.setState({
      selectedFileUpload: event.target.value,
      selectedFile: event.target.files[0]
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

  updateCurrentFolderId = id => {
    this.setState({
      currentFolderId: id
    })
  }

  updateCurrentFileId = id => {
    this.setState({
      currentFileId: id
    })
  }

  fileUploadHandler = () => {
    if (this.state.selectedFileUpload) {
      const formData = new FormData()
      formData.append('file', this.state.selectedFile)
      if (this.state.currentFolderId !== 0) {
        formData.append('folderId', this.state.currentFolderId)
      }
      axios.post('http://localhost:8080/api/files/create', formData, {
        'Content-Type': 'multipart/form-data'
      })
        .then(response => {
          this.fileInput.value = null
          this.setState({
            selectedFileUpload: '',
            selectedFile: '',
            files: [...this.state.files, response.data]
          })
        })
    }
  }

  folderUploadHandler = () => {
    console.log(this.state.selectedFolderNameUpload)
    if (this.state.selectedFolderNameUpload) {
      let folder = { name: this.state.selectedFolderNameUpload }
      console.log('Data about to be posted: ', folder)
      axios.post('http://localhost:8080/api/folders/create?name=' + this.state.selectedFolderNameUpload, folder)
        .then(response => {
          this.folderNameInput.value = null
          this.setState({
            selectedFolderNameUpload: null,
            folders: [...this.state.folders, response.data]
          })
        }).catch(err => console.log(err))
    }
  }
  render() {
    { console.log('from App.js: ', this.state.mydriveFolders) }
    return (
      <Fragment>
        <div className="container">
          <div className="d-flex shadow p-3 ml-5 mr-5 bg-white"
            style={{ width: "90%", height: "700px" }}>
            <Navbar
              links={this.state.links}
            />
            <Modal
              newFolderClicked={this.folderUploadHandler}
              newFolderInputChanged={this.selectedFolderNameUpload}
              inputValue={this.state.selectedFolderNameUpload}
              newFileClicked={this.fileUploadHandler}
              newFileInputChanged={this.selectedFileUploadHandler}
              newFile={this.state.selectedFileUpload}
            />
            <Switch>
              {/* <Route path='/driveStorage' component={HomeContainer} /> */}
              <Route
                path='/trash'
                render={() =>
                  <TrashContainer
                    folders={this.state.trashFolders}
                    files={this.state.trashFiles}
                    folderClicked={id => this.updateCurrentFolderId(id)}
                    fileClicked={id => this.updateCurrentFileId(id)}
                  />}
              /><Route
                path='/'
                render={() =>
                  <MyDriveContainer
                    folders={this.state.mydriveFolders}
                    files={this.state.mydriveFiles}
                    folderClicked={id => this.updateCurrentFolderId(id)}
                    fileClicked={id => this.updateCurrentFileId(id)}
                  />}
              />
            </Switch>

          </div>
        </div>
      </Fragment>
    )
  }
}


export default App;
