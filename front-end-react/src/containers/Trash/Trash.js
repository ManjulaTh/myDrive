import React, { Component, Fragment } from 'react'

import SectionHeader from '../../components/SectionHeader/SectionHeader'
import SectionBody from '../../components/SectionBody/SectionBody'

class Trash extends Component {
    state = {
        buttonIcons: [
            { action: 'Delete', },
            { action: 'Restore' }
        ]
    }
    render() {
        let section = 'Loading...'
        section = (
            <div className="container-fluid">
                <SectionHeader section='trash' buttonIcons={this.state.buttonIcons} />
                <SectionBody section='trash' folders={this.props.folders} />
            </div>
        )
        return section
    }
}


export default Trash;