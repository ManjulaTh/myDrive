import React from 'react'
import fileIcon from '../../../img/file.png'

const FileCard = props => {
    return (

        <div className="card d-flex justify-content-center">
            <img className="card-img-top" style={{ width: "100px", height: "100px" }} src={fileIcon} alt="Card image cap" />
            <p className="font">{props.fileName}</p>
        </div>

    )
}

export default FileCard


