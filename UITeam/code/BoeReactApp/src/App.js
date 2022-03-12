// import logo from './logo.svg';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import axios from 'axios';

import Home from './components/Home';
import Database from './components/Database'
import Render from './components/Render'
import About from './components/About'

import './App.css';
import "./style.css";
// var perf = require('./components/home.html');

class App extends Component {
    state = {
        data: {}
    }

    componentDidMount(){
        axios.get('http://143.198.157.93:3857/find/sidewalk?lon=-13154587.02777774&lat=4038051.2097873827&srout=3857')
            .then(res => this.setState({
                data: res.data,
                // currentStats: res.data[res.data.length - 1]
            }));
    }

    render() {
        return (
            <Router>
                <Routes>
                    <Route exact path='/' element={ <Home/> } />
                    <Route exact path='/database' element={ <Database/> } />
                    <Route exact path='/render' element={ <Render data={ this.state.data } /> } />
                    <Route exact path='/about' element={ <About/> } />
                </Routes>
            </Router>

        );
    }
}

export default App;
