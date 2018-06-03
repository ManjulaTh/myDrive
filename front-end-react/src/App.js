import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/FileDownload';
import UploadIcon from '@material-ui/icons/FileUpload';

class App extends Component {

  state = {
    files: [],
    selectedFileUpload: null
  }

  componentDidMount() {
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

  fileUploadHandler = () => {
    if (this.state.selectedFileUpload) {
      const formData = new FormData()
      formData.append("file", this.state.selectedFileUpload)
      axios.post('http://localhost:8080/api/files/create', formData, {
        "Content-Type": "multipart/form-data"
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
    var filename = "";
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
        this.setState({ files: this.state.files.filter((elem) => elem["id"] !== id) })
      }
    )
  }

  render() {
    return (
      <div className="App">
        <Paper className="fileContainer">
          <div className="fileUploadContainer" style={{ padding: '1em' }} >
            <input type="file" onChange={this.selectedFileUploadHandler} ref={ref=> this.fileInput = ref} />
            <Button variant="raised" onClick={this.fileUploadHandler}>Upload File</Button>
          </div>
        </Paper>
        <Paper className="folderContainer">
          <div className="folderUploadContainer" style={{ padding: '1em' }} >
            <TextField placeholder="Folder Name" onChange={this.selectedFolderUploadHandler} value={this.state.folderInput} />
            <UploadIcon onClick={this.folderUploadHandler}/>
          </div>
        </Paper>
        <div className="all">
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell numeric>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Delete</TableCell>
                <TableCell>Download</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.files.map(n => {
                return (
                  <TableRow hover key={n.id}>
                    <TableCell numeric>
                      {n.id}
                    </TableCell>
                    <TableCell>
                      {n.name}
                    </TableCell>
                    <TableCell>
                      <DeleteIcon onClick={() => this.fileDeleteHandler(n.id)}/>
                    </TableCell>
                    <TableCell>
                      <DownloadIcon onClick={() => this.fileDownloadHandler(n.id)}/>
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
