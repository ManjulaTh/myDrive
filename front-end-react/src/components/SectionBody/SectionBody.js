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
    let fileSection
    let folderSection

    { console.log('from sec-body', props.folders) }
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

    { console.log('trashFolders', trashFolders) }

    switch (props.section) {
        case 'trash':
            folderTitle = 'Deleted Folders'
            fileTitle = 'Deleted Files'
            folders = trashFolders
            files = trashFiles
            break
        case 'myDrive':
            folderTitle = 'Folders'
            fileTitle = 'Files'
            folders = myDriveFolders
            files = myDriveFiles
    }
    { console.log('files from_sec-body', myDriveFiles) }
    if (folders) {
        folderSection = (
            folders.map(folder => <FolderCard key={folder.folder.folderName} folderName={folder.folder.folderName} />)
        )
    }
    if (files) {
        fileSection = (
            files.map(file => <FileCard key={file.file.fileName} fileName={file.file.fileName} />))
    }

    return (
        <section id='header-body'>
            <p className="font font-weight-light"> {folderTitle}</p>
            <div id="FolderDiv">
                {folderSection}
            </div>
            <p className="font font-weight-light">{fileTitle}</p>
            <div id="FileDiv d-flex fex-row">
                <div className="card-deck wrap d-flex flex-row justify-content-left mt-3" style={{ width: "150px", height: "140px" }}>

                    {fileSection}
                </div>


            </div>
        </section>
    )
}
export default sectionBody