import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui/styles';
import './index.css'
import App from './App'


ReactDOM.render(
    <MuiThemeProvider><BrowserRouter><App /></BrowserRouter></MuiThemeProvider>,
    document.getElementById('root')
)
