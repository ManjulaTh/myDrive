import React, { Component, Fragment } from 'react'

import SectionHeader from '../../components/SectionHeader/SectionHeader'
import SectionBody from '../../components/SectionBody/SectionBody'


class MyDrive extends Component {
    state = {
        buttonIcons: [
            { action: 'Delete' },
            { action: 'Download' }
        ]
    }
    render() {
        let section = 'Loading...'
        { console.log('from drive', this.props.folders) }

        section = (
            <div className="container-fluid">
                <SectionHeader section='myDrive' buttonIcons={this.state.buttonIcons} />
                <SectionBody section='myDrive' folders={this.props.folders} />
            </div>
        )
        { console.log('hello', this.state.folders) }
        return section
    }
}

export default MyDrive;