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


        section = (
            <Fragment>
                <SectionHeader section='myDrive' buttonIcons={this.state.buttonIcons} />
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

export default MyDrive;