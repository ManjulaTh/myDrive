import React from 'react'
import folderImage from '../../../img/folder.png'

const FolderCard = props => {
    return (
        <div className="card d-inline-flex p-2 justift-content-center">
            <img className="card-img-left" style={{ width: "25px", height: "25px" }} src={folderImage} alt="Card image cap" />
            <p className="font">{props.folderName}</p>
        </div>
    )
}

export default FolderCard
