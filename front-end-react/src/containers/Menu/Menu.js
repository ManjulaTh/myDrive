import React from 'react';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class SimpleMenu extends React.Component {
    state = {
        open: false,
    };

    handleToggle = () => {
        this.setState({ open: !this.state.open });
    };

    handleClose = event => {
        if (this.target1.contains(event.target) || this.target2.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        const { open } = this.state;
        return (
            <div>
                <Button
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    Open Menu
        </Button>
                <ClickAwayListener onClickAway={this.handleClose}>
                    <Grow in={open} id="menu-list-grow" style={{ transformOrigin: '0 0 0' }}>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                            <MenuItem onClick={this.handleClose}>My account</MenuItem>
                            <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                        </Menu>
                    </Grow>
                </ClickAwayListener>
            </div>
        );
    }
}

export default SimpleMenu;