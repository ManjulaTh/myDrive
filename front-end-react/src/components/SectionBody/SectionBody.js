import React from 'react'
import FolderCard from './Cards/FoldeCard'
import FileCard from './Cards/FileCard'

const sectionBody = props => {
    let folderTitle
    let fileTitle
    let folders
    let files
    let myDriveFolders
    let myDriveFiles
    let trashFolders
    let trashFiles


    {
        props.folders.map(folder => {
            if (folder.trash) {
                trashFolders = [{ ...trashFolders, folder }]
                folder.files.map(file => {
                    trashFiles = [{ ...trashFiles, file }]
                })
            } else {
                myDriveFolders = [{ ...myDriveFolders, folder }]
                folder.files.map(file => {
                    if (file.trash) {
                        trashFiles = [{ ...trashFiles, file }]
                    } else {
                        myDriveFiles = [{ ...myDriveFiles, file }]
                    }
                })

            }

        })
    }



    switch (props.section) {
        case 'trash':
            folderTitle = 'Deleted Folders'
            fileTitle = 'Deleted Files'
            folders = trashFolders
            files = trashFiles
            break
        default:
            folderTitle = 'Folders'
            fileTitle = 'Files'
            folders = myDriveFolders
            files = myDriveFiles
    }

    return (
        <section id='header-body'>
            <p className="font font-weight-light"> {folderTitle}</p>
            <div id="FolderDiv">
                {folders.map(folder => <FolderCard folderName={folder.folderName} />)}
            </div>
            <p className="font font-weight-light">{fileTitle}</p>
            <div id="FileDiv">
                {files.map(file => <FileCard fileName={file.fileName} />)}
            </div>
        </section>
    )
}
export default sectionBody