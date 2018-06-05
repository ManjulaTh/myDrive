import React from 'react'
import fileIcon from '../../../img/file.png'

const FileCard = props => {
    return (

        <div className="card d-inline-flex p-2 justify-content-center">
            <img className="card-img-top" style={{ width: "110px", height: "90px" }} src={fileIcon} alt="Card image cap" />
            <p className="font">{props.fileName}</p>
        </div>

    )
}

export default FileCard


