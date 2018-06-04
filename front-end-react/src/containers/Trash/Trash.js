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
            <Fragment>
                <SectionHeader section='trash' buttonIcons={this.state.buttonIcons} />
                <SectionBody />
            </Fragment>
        )

        return (
            <div >
                {section}
            </div>
        )
    }
}


export default Trash;