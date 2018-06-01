import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  state = {
    selectedFileUpload: null,
    selectedFileDownload: null,
  }

  selectedFileUploadHandler = event => {
    this.setState({
      selectedFileUpload: event.target.files[0]
    })
  }

  fileUploadHandler = () => {
    const formData = new FormData()
    formData.append("file", this.state.selectedFileUpload)
    axios.post('http://localhost:8080/api/files/create', formData, {
      "Content-Type": "multipart/form-data"
    })
      .then(response => {
        console.log(response)
      })
  }

  selectedFileDownloadHandler = event => {
    this.setState({
      selectedFileDownload: event.target.value
    })
  }

  fileDownloadHander = () => {
    axios({
      url: `http://localhost:8080/api/files/${this.state.selectedFileDownload}`,
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

  render() {
    return (
      <div className="App">
        <div className="upload">
          <input type="file" onChange={this.selectedFileUploadHandler}/>
          <button onClick={this.fileUploadHandler}>Upload</button>
        </div>
        <div className="download">
          <input type="text" onChange={this.selectedFileDownloadHandler}/>
          <button onClick={this.fileDownloadHander}>Download</button>
        </div>
      </div>
    )
  }
}

export default App
