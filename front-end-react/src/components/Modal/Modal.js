import React, { component, Fragment, Component } from 'react'
import UploadIcon from '@material-ui/icons/FileUpload'
import Button from '@material-ui/core/Button'

class Modal extends Component {
    state = {
        showFolderInputs: false,
        showFileInputs: false

    }

    toggleInputHandler = type => {
        if(type === 'folder'){
            this.setState({ showFolderInputs: !this.state.showFolderInputs, showFileInputs: false })
        } else {
            this.setState({ showFileInputs: !this.state.showFileInputs, showFolderInputs: false })
        }
    }

    folderUploadHandler = (folderName) => {
        this.props.newFolderClicked(folderName)
        this.toggleInputHandler('folder')
    }

    fileUploadHandler = (file) => {
        this.props.newFileClicked(file)
        this.toggleInputHandler('file')
    }

    render() {

        let folderNameInput = <button type="button" onClick={() => this.toggleInputHandler('folder')} className="btn btn-light font w-100" >Folder</button>
        let fileSelect = <button type="button" onClick={() => this.toggleInputHandler('file')} className="btn btn-light font w-100">File</button>

        if (this.state.showFolderInputs) {
            folderNameInput = (
                <Fragment>
                    <input type='text' placeholder='Folder Name' onChange={this.props.newFolderInputChanged} value={this.props.inputValue} />
                    <UploadIcon onClick={() => this.folderUploadHandler(this.props.inputValue)} data-dismiss='modal' />
                </Fragment>
            )
        }

        if (this.state.showFileInputs) {
            fileSelect = (
                <Fragment>
                    <input type='file' onChange={this.props.newFileInputChanged} value={this.props.newFile} />
                    <Button variant='raised' onClick={() => this.fileUploadHandler(this.props.newFile)} data-dismiss='modal'>Upload File</Button>
                </Fragment>
            )
        }
        return (

            <div className="modal bd-example-modal-sm" role="dialog" id="newModal" >
                <div className="modal-dialog modal-sm modal-dialog-relative">
                    <div className="modal-content position-relative">
                        {folderNameInput}
                        {fileSelect}
                    </div>

                </div>
            </div>

        )
    }
}
export default Modal