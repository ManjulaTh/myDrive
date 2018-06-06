import React, { Component, Fragment } from 'react'
import axios from 'axios'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import SectionBody from '../../components/SectionBody/SectionBody'
import arrow from '../../img/play-arrow.png'

class MyDrive extends Component {
    state = {
        buttonIcons: [
            { action: 'Delete' },
            { action: 'Download' }
        ],
        files: [],
        filesInFolder: [],
        folderDoubleClicked: false,
        folderViewTitle: null
    }



    toggleFolderDoubleClicked = () => {
        this.setState({ showInputs: !this.state.folderDoubleClicked })
    }

    // addArrow = () => {
    //     return (
    //         <div>
    //             <img src="arrow" style={width = "10px", height="10px"}/>
    //     </div>
    //     )
    // }

    folderDoubleClickHandler = (id, name) => {
        this.setState({ folderViewTitle: `My Drive > ${name}` })
        axios.get('http://localhost:8080/api/files/?id=')
            .then(response => {
                this.setState({ filesInFolder: response.data.filter(file => { file.trash === false }) })
            })
    }

    iconClickHandler = () => {

    }

    render() {
        let section
        if (!this.state.folderDoubleClicked) {
            section = (
                <div className="container-fluid">
                    <SectionHeader
                        section="myDrive"
                        buttonIcons={this.state.buttonIcons}
                        // clicked = {action =>this.iconClickHandler(action)}
                    />
                    <SectionBody
                        section="myDrive"
                        folders={this.props.folders}
                        files={this.props.files}
                        folderClicked={this.props.folderClicked }
                        folderDoubleClicked={this.folderDoubleClickHandler}
                        fileClicked={this.props.fileClicked}
                    />
                </div>
            )

        } else {
            section = (
                <div className="container-fluid">
                    <SectionHeader
                        section={this.state.folderViewTitle}
                        buttonIcons={this.state.buttonIcons}
                    />
                    <SectionBody
                        files={this.props.filesInFolder}
                        fileClicked={this.props.fileClicked}
                    />
                </div>
            )
        }
        return section
    }
}

export default MyDrive;