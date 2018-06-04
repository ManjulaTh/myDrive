import React from 'react'
import folderImage from '../../../img/folder.png'

const FolderCard = props => {
    return (
        <div className="card-deck wrap " style={{ width: "150px", height: "35px" }}>
            <div className="card d-flex justify-content-center">
                <img className="card-img-center" style={{ width: "25px", height: "25px" }} src={folderImage} alt="Card image cap" />
                <p className="font">{props.folderName}</p>
            </div>
        </div>
    )
}

export default FolderCard
