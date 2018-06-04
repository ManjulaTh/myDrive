import React from 'react'
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';


const ButtonIcon = props => {

    let image
    switch (props.action) {
        case 'Delete':
            image = props.deleteIcon
            break
        case 'Download':
            image = props.downloadIcon
            break
        case 'Restore':
            image = props.restoreIcon

    }

    return (
        <IconButton md-12 aria-label={props.action}>

            {image}
        </IconButton>

    )


}

export default ButtonIcon