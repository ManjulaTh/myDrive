import React, { Component, Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar'
import classNames from 'classnames';

import Foo from './containers/MyDrive/MyDrive';
import Bar from './containers/Trash/Trash';
import NewMenu from './containers/Menu/Menu'

import './App.css';

const paperStyle = {
  height: '100%',
  width: "100%",
  position: 'relative',
  textAlign: 'center',

};



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "open": false,
      "show": null
    };
  }
  showBar = () => {
    this.setState({ show: 'bar', open: false });
  };

  showFoo = () => {
    this.setState({ show: 'foo', open: false });
  };

  showNewMenu = () => {
    this.setState({ show: 'newMenu', open: false });
  };
  // showDriverStorage = () => {
  //   this.setState({ show: 'foo', open: false });
  // }


  render() {
    let content = null;
    let title
    switch (this.state.show) {
      case 'bar':
        content = (<Bar />)
        title = 'Trash'
        break
      case 'newMenu':
        content = (<NewMenu />)
        title = 'NEW'
        break
      default:
        content = (<Foo />);
        title = 'My Drive'
    }

    return (

      // <Fragment>
      //   <div className="container">
      //     <div className=" container d-flex shadow p-3 ml-5 mr-5 bg-white rounded"
      //       style={{ width: "90%", height: "700px", position: "absolute" }}>

      <Grid container style={{ height: "700px" }} >
        <Drawer
          variant="permanent"
          style={{ float: "right", position: "relative" }}
        >

          <MenuItem id="showdriverStorageId" onClick={this.showFoo}>Driver Storage</MenuItem>
          <MenuItem id="showNewMenu" onClick={this.showNewMenu}>NEW</MenuItem>
          <MenuItem id="showFooId" onClick={this.showFoo}>Show Foo</MenuItem>
          <MenuItem id="showBarId" onClick={this.showBar}>Show Bar</MenuItem>

        </Drawer>
        <Paper style={paperStyle} zDepth={5} >

          <Toolbar style={{ "justifyContent": "center" }}>
            <ToolbarTitle text={title} />
          </Toolbar>
          {content}
          <p >Click the icon on the AppBar to open the Drawer and then pick a menu item. The text above should change.</p>
        </Paper>
      </Grid>

      //     </div>
      //   </div>
      // </Fragment>

    );
  }
}

export default App;
