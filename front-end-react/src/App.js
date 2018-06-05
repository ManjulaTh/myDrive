import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/FileDownload';
import UploadIcon from '@material-ui/icons/FileUpload';

class App extends Component {

  state = {
    files: [],
    folders: [],
    selectedFileUpload: null,
    selectedFolderFileIdUpload: null,
    selectedFolderNameUpload: null
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/folders/all')
      .then(response => {
        this.setState({folders: response.data})
      })

    axios.get('http://localhost:8080/api/files/all')
      .then(response => { 
        this.setState({files: response.data}) 
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
    if (this.state.selectedFileUpload) {
      const formData = new FormData()
      formData.append('file', this.state.selectedFileUpload)
      formData.append('folderId', this.state.selectedFolderFileIdUpload)
      axios.post('http://localhost:8080/api/files/create', formData, {
        'Content-Type': 'multipart/form-data'
      })
        .then(response => {
          this.fileInput.value = null
          this.setState({
            selectedFileUpload: null,
            files: [...this.state.files, response.data] 
          })
        })
    }
  }

  folderUploadHandler = () => {
    console.log('It was click.')
    console.log(this.state.selectedFolderNameUpload)
    if (this.state.selectedFolderNameUpload) {
      axios.post('http://localhost:8080/api/folders/create', this.state.selectedFolderNameUpload)
        .then(response => {
          this.folderNameInput.value = null
          this.setState({
            selectedFolderNameUpload: null,
            folders: [...this.state.folders, response.data]
          })
        })
    }
  }

  fileDownloadHandler = (id) => {
    axios({
      url: `http://localhost:8080/api/files/${id}`,
      method: 'GET',
      responseType: 'blob'
    })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', this.grabFileNameFromContentDisposition(response.headers))
        document.body.appendChild(link)
        link.click()
      })
  }

  grabFileNameFromContentDisposition = header => {
    var filename = '';
    var disposition = header['content-disposition']
    if (disposition && disposition.indexOf('attachment') !== -1) {
        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
        var matches = filenameRegex.exec(disposition)
        if (matches != null && matches[1]) { 
          filename = matches[1].replace(/['"]/g, '')
        }
    }
    return filename
  }

  fileDeleteHandler = (id) => {
    axios.delete(`http://localhost:8080/api/files/${id}`)
      .then(response => {
        this.setState({ files: this.state.files.filter((elem) => elem['id'] !== id) })
      }
    )
  }

  folderDeleteHandler = (id) => {
    axios.delete(`http://localhost:8080/api/folders/${id}`)
      .then(response => {
        this.setState({ folders: this.state.folders.filter((elem) => elem['id'] !== id) })
      })
  }

  render() {
    return (
      <div className='App'>
        <Paper className='fileContainer'>
          <div className='fileUploadContainer' style={{ padding: '1em' }} >
            <input type='file' onChange={this.selectedFileUploadHandler} ref={ ref => this.fileInput = ref } />
            <input type='number' onChange={this.selectedFileFolderIdHandler} ref={ ref => this.fileFolderIdInput = ref } />
            <Button variant='raised' onClick={this.fileUploadHandler}>Upload File</Button>
          </div>
        </Paper>
        <br/>
        <Paper className='folderContainer'>
          <div className='folderUploadContainer' style={{ padding: '1em' }} >
            <input type='text' placeholder='Folder Name' onChange={this.selectedFolderUploadHandler} ref={ ref => this.folderNameInput = ref }/>
            <UploadIcon onClick={this.folderUploadHandler} />
          </div>
        </Paper>
        <br/>
        <div className='all'>
          <Paper>
            <Table>
              <TableHead>
                <Typography variant='title' id='tableTitle' style={{ margin: '5px' }} >
                  Files
                </Typography>
                <TableRow>
                  <TableCell numeric>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Delete</TableCell>
                  <TableCell>Download</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.files.map(file => {
                  return (
                    <TableRow hover key={file.id}>
                      <TableCell numeric>
                        {file.id}
                      </TableCell>
                      <TableCell>
                        {file.name}
                      </TableCell>
                      <TableCell>
                        <DeleteIcon onClick={() => this.fileDeleteHandler(file.id)}/>
                      </TableCell>
                      <TableCell>
                        <DownloadIcon onClick={() => this.fileDownloadHandler(file.id)}/>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
          <br/>
          <Paper>
            <Table>
              <TableHead>
                <Typography variant='title' id='tableTitle' style={{ margin: '5px' }} >
                  Folders
                </Typography>
                <TableRow>
                  <TableCell numeric>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.folders.map(folder => {
                  return (
                    <TableRow hover key={folder.id}>
                      <TableCell numeric>
                        {folder.id}
                      </TableCell>
                      <TableCell>
                        {folder.name}
                      </TableCell>
                      <TableCell>
                        <DeleteIcon onClick={() => this.folderDeleteHandler(folder.id)}/>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    )
  }
}

export default App
