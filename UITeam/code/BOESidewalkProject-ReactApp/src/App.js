import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import axios from 'axios';

import Home from './components/Home';
import Render from './components/Render'
import NavigateLA from './components/NavigateLA'
import About from './components/About'

import './App.css';
import "./style.css";

class App extends Component {
    state = {
        closestSidewalk: {},
        allRoverData: [{
          "ID": 403,
          "INPUT_SW_ID": 123,
          "RAW_GPS": "123, $GPRMC,231942.0, A,3404.12639, N,11810.17795, W,0.081, ,10222, , , D*6A,1.317,-1.694,17.5,20.3",
          "LATITUDE": 4038040.3246404654,
          "LONGITUDE": -13154583.31712805,
          "DATE": "2022-02-01T00:00:00.000Z",
          "SLOPE_X": 1.317,
          "SLOPE_Y": -1.694,
          "Shape": {
            "srid": 0,
            "version": 1,
            "points": [
              {
                "x": -118.169632499998,
                "y": 34.068773166666084,
                "z": 3857,
                "m": null
              }
            ],
            "figures": [
              {
                "attribute": 1,
                "pointOffset": 0
              }
            ],
            "shapes": [
              {
                "parentOffset": -1,
                "figureOffset": 0,
                "type": 1
              }
            ],
            "segments": [
              
            ]
          },
          "RECORD_FILE": "2021_02_17_16_29_34_slope_data.csv",
          "SRID": 3857,
          "TIME": "1970-01-01T16:25:42.000Z",
          "X_AXIS_TEMP": 17.5,
          "Y_AXIS_TEMP": 20.3,
          "SPEED": 0.081
        }],
        currentLocation: {}
    }

    componentDidMount(){
        axios.get('http://143.198.157.93:3857/rover/where?INPUT_SW_ID=123&srin=4326&srout=4326&LIMIT=1500')
            .then(res => this.setState({
                allRoverData: res.data
        }));
    }

    render() {
        return (
            <Router>
                <Routes>
                    <Route exact path='/' element={ <Home/> } />
                    <Route exact path='/render' element={ <Render closestSidewalk={ this.state.closestSidewalk } allRoverData={ this.state.allRoverData } /> } />
                    <Route exact path='/navigatela' element={ <NavigateLA /> } />
                    <Route exact path='/about' element={ <About/> } />
                </Routes>
            </Router>

        );
    }
}

export default App;
