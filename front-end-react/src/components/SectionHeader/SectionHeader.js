import React from 'react'
import ButtonIcon from './ButtonIcon/ButtonIcon'

import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/FileDownload'
import RestoreIcon from '@material-ui/icons/Restore'

const sectionHeader = props => {

    { console.log('hai', props.section) }

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

        <div className="w-100">
            <nav className="navbar navbar-expand-lg container-fluid shadow-sm mb-2 mt-4 p-0 m-0 mw-5 bg-white rounded navbar-light bg-light">
                <div className="d-fex flex-row">
                    <h6 className="align-bottom font-weight-light p-0 m-0">{title}</h6>
                </div>
                <div className="d-flex flex-row-reverse">
                    {console.log('Hello', props.buttonIcons)}
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