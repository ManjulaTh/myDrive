import React from 'react'
import fileIcon from '../../../img/file.png'

const FileCard = props => {
    return (
        <div className="card-deck wrap " style={{ width: "150px", height: "140px" }}>
            <div className="card d-flex justify-content-center">
                <img className="card-img-top" style={{ width: "100px", height: "100px" }} src={fileIcon} alt="Card image cap" />
                <p className="font">{props.fileName}</p>
            </div>
        </div>
    )
}

export default FileCard


