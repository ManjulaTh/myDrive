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

        <div className="container mw-5">
            <nav className="navbar navbar-expand-lg container-fluid shadow-sm mb-2 mt-4 p-0 m-0 mw-5 bg-white rounded navbar-light bg-light">
                <div className="d-fex flex-row">
                    <p className=" font align-bottom font-weight-light p-0 m-0">{title}</p>
                </div>
                <div className="d-flex flex-row-reverse">
                    {props.buttonIcons.map(buttonIcon => (
                        <ButtonIcon
                            section={buttonIcon.section}
                            action={buttonIcon.action}
                            deleteIcon={<DeleteIcon />}
                            downloadIcon={<DownloadIcon />}
                            restoreIcon={<RestoreIcon />}
                        />
                    ))}

                </div>

            </nav>
        </div>



    )
}

export default sectionHeader