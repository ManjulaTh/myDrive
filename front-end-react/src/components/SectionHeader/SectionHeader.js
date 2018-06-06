import React from 'react'
import ButtonIcon from './ButtonIcon/ButtonIcon'

import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/FileDownload'
import RestoreIcon from '@material-ui/icons/Restore'

const sectionHeader = props => {

    let title
    switch (props.section) {
        case 'trash':
            title = 'Trash'
            break
        case 'myDrive':
            title = 'My Drive'
            break
            defaut:
            title = ''
    }



    return (

        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg container-fluid shadow-sm mb-2 mt-4 p-0 m-0 mw-5 bg-white rounded navbar-light bg-light d-flex flex-row">
                <div className="horizontal-navbar">
                    <p className=" font align-bottom font-weight-light p-0 m-0" style={{ width: '50px' }}>{title}</p>
                </div>
                <div className="w-100 d-flex flex-row-reverse">
                    {props.buttonIcons.map(buttonIcon => (
                        <ButtonIcon

                            key={buttonIcon.section}
                            action={buttonIcon.action}
                            deleteIcon={<DeleteIcon />}
                            downloadIcon={<DownloadIcon />}
                            restoreIcon={<RestoreIcon />}
                            clicked = {() => props.clicked(buttonIcon.action) }
                        />
                    ))}

                </div>

            </nav>
        </div>



    )
}

export default sectionHeader