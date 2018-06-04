import React from 'react'
import folderIcon from '@material-ui/icons/Folder'
import Icon from '@material-ui/core/Icon';

const FolderCard = props => {
    return (
        <div className="card-deck wrap d-flex justify-content-center " style={{ width: "200px", height: "20px" }}>
            <div className="card">
                <Icon md-18 aria-label='Folder'>{<folderIcon />}</Icon>/>
                <h2>{props.folderName}</h2>
            </div>
        </div>
    )
}

export default FolderCard
