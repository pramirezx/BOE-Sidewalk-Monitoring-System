import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import axios from 'axios';
import ReactPhotoSphereViewer from 'react-photosphere'

import MapContainer from "./MapContainer";

// import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob"

class Render extends Component {
    state = {
        closestSidewalk: {
            "OBJECTID": 978306,
            "Shape": {
              "srid": 3857,
              "version": 1,
              "points": [
                {
                  "x": -118.16962851661609,
                  "y": 34.068818902293685,
                  "z": null,
                  "m": null
                },
                {
                  "x": -118.16966274602166,
                  "y": 34.06882348987494,
                  "z": null,
                  "m": null
                },
                {
                  "x": -118.16966389406859,
                  "y": 34.068814344477566,
                  "z": null,
                  "m": null
                },
                {
                  "x": -118.16966381950843,
                  "y": 34.06880514922227,
                  "z": null,
                  "m": null
                },
                {
                  "x": -118.1696625187479,
                  "y": 34.068796018705605,
                  "z": null,
                  "m": null
                },
                {
                  "x": -118.16966001154995,
                  "y": 34.06878706380346,
                  "z": null,
                  "m": null
                },
                {
                  "x": -118.16965632755893,
                  "y": 34.068778395391824,
                  "z": null,
                  "m": null
                },
                {
                  "x": -118.16965151258903,
                  "y": 34.068770119881854,
                  "z": null,
                  "m": null
                },
                {
                  "x": -118.16964562413233,
                  "y": 34.06876233847583,
                  "z": null,
                  "m": null
                },
                {
                  "x": -118.16963873674905,
                  "y": 34.06875514865553,
                  "z": null,
                  "m": null
                },
                {
                  "x": -118.16963093488083,
                  "y": 34.06874863897287,
                  "z": null,
                  "m": null
                },
                {
                  "x": -118.16962231285072,
                  "y": 34.0687428875622,
                  "z": null,
                  "m": null
                },
                {
                  "x": -118.16960216274059,
                  "y": 34.06876636721571,
                  "z": null,
                  "m": null
                },
                {
                  "x": -118.1696091058194,
                  "y": 34.06877113190363,
                  "z": null,
                  "m": null
                },
                {
                  "x": -118.16961519010883,
                  "y": 34.06877665114271,
                  "z": null,
                  "m": null
                },
                {
                  "x": -118.16962029882785,
                  "y": 34.068782815545156,
                  "z": null,
                  "m": null
                },
                {
                  "x": -118.16962433316179,
                  "y": 34.0687895105144,
                  "z": null,
                  "m": null
                },
                {
                  "x": -118.16962721675387,
                  "y": 34.0687966043386,
                  "z": null,
                  "m": null
                },
                {
                  "x": -118.16962889211186,
                  "y": 34.06880396307375,
                  "z": null,
                  "m": null
                },
                {
                  "x": -118.16962932689646,
                  "y": 34.06881144310192,
                  "z": null,
                  "m": null
                },
                {
                  "x": -118.16962851661609,
                  "y": 34.068818902293685,
                  "z": null,
                  "m": null
                }
              ],
              "figures": [
                {
                  "attribute": 2,
                  "pointOffset": 0
                }
              ],
              "shapes": [
                {
                  "parentOffset": -1,
                  "figureOffset": 0,
                  "type": 3
                }
              ],
              "segments": [
                
              ]
            },
            "SIDEWALK_ID": 978082,
            "ASSETID": 4704192,
            "FEATURETYPE": "Ramp",
            "PIND": "136-5A235-179",
            "CALC_WIDTH": 5,
            "CALC_LENGTH": 33,
            "CALC_MIN_WIDTH": 5,
            "CALC_MAX_WIDTH": null,
            "NOTES": null,
            "CRTN_DT": "2018-01-05T10:13:27.000Z",
            "USER_ID": "STEFANIE",
            "LST_MODF_DT": "2018-01-16T20:53:35.000Z"
        },
        currentLocation: {
            lat: 34.0688,
            lng: -118.1684
        },
        data: this.props.allRoverData[0],
        allPics: [],
        currentPics: [],
        currentPic: '',
        picNum: 0,
        currentPicName: '',
        currentDate: ''
    }

    handler = (val) => {
        var url = 'http://143.198.157.93:3857/find/sidewalk?lon=' + val.position.lng + '&lat=' + val.position.lat +'&srin=4326&srout=4326'
        axios.get(url)
            .then(res => {this.setState({
                closestSidewalk: res.data[0]
                });
                return res})
            .then(res => {
                var pics = []
                this.state.allPics.filter((element) => {
                    if(element.SW_ID === this.state.closestSidewalk.SIDEWALK_ID){
                        pics.push(element)
                    };
                })
                if(pics.length !== 0){
                    this.setState({
                        currentPics: pics,
                        currentPic: `https://swbotblob.blob.core.windows.net/csulaswproject/360Images/PHOTO_${pics[0].IMAGE_NAME.slice(4,-4)}.jpg?sv=2019-10-10&si=csulaswproject-17C19A6298B&sr=c&sig=xZ2soDIU1tHpJVeQVKnAYykG32Sggh3C5xNTnv1%2FB6Y%3D&_=1647475835246`,
                        picNum: 0,
                        currentPicName: 'PHOTO_' + pics[0].IMAGE_NAME.slice(4,-4) + '.jpg',
                        currentDate: pics[0].DATETIME
                    })
                } else{
                    this.setState({
                        currentPics: [],
                        currentPic: '',
                        picNum: 0,
                        currentPicName: '',
                        currentDate: ''
                    })
                }
            })

        this.setState({
            currentLocation: val.position,
            data: val.marker
        })
    }

    nextPicHandler(val){
        var num = this.state.picNum + 1
        if(num < this.state.currentPics.length){
            this.setState({
                currentPic: `https://swbotblob.blob.core.windows.net/csulaswproject/360Images/PHOTO_${this.state.currentPics[num].IMAGE_NAME.slice(4,-4)}.jpg?sv=2019-10-10&si=csulaswproject-17C19A6298B&sr=c&sig=xZ2soDIU1tHpJVeQVKnAYykG32Sggh3C5xNTnv1%2FB6Y%3D&_=1647475835246`,
                picNum: num,
                currentPicName: 'PHOTO_' + this.state.currentPics[num].IMAGE_NAME.slice(4,-4) + '.jpg',
                currentDate: this.state.currentPics[num].DATETIME
            })
        }
        else{
            num = 0
            this.setState({
                currentPic: `https://swbotblob.blob.core.windows.net/csulaswproject/360Images/PHOTO_${this.state.currentPics[num].IMAGE_NAME.slice(4,-4)}.jpg?sv=2019-10-10&si=csulaswproject-17C19A6298B&sr=c&sig=xZ2soDIU1tHpJVeQVKnAYykG32Sggh3C5xNTnv1%2FB6Y%3D&_=1647475835246`,
                picNum: num,
                currentPicName: 'PHOTO_' + this.state.currentPics[num].IMAGE_NAME.slice(4,-4) + '.jpg',
                currentDate: this.state.currentPics[num].DATETIME
            })
        }
    }

    prevPicHandler(val){
        var num = this.state.picNum - 1
        if(num >= 0){
            this.setState({
                currentPic: `https://swbotblob.blob.core.windows.net/csulaswproject/360Images/PHOTO_${this.state.currentPics[num].IMAGE_NAME.slice(4,-4)}.jpg?sv=2019-10-10&si=csulaswproject-17C19A6298B&sr=c&sig=xZ2soDIU1tHpJVeQVKnAYykG32Sggh3C5xNTnv1%2FB6Y%3D&_=1647475835246`,
                picNum: num,
                currentPicName: 'PHOTO_' + this.state.currentPics[num].IMAGE_NAME.slice(4,-4) + '.jpg',
                currentDate: this.state.currentPics[num].DATETIME
            })
        }
        else{
            num = this.state.currentPics.length - 1
            this.setState({
                currentPic: `https://swbotblob.blob.core.windows.net/csulaswproject/360Images/PHOTO_${this.state.currentPics[this.state.currentPics.length - 1].IMAGE_NAME.slice(4,-4)}.jpg?sv=2019-10-10&si=csulaswproject-17C19A6298B&sr=c&sig=xZ2soDIU1tHpJVeQVKnAYykG32Sggh3C5xNTnv1%2FB6Y%3D&_=1647475835246`,
                picNum: this.state.currentPics.length - 1,
                currentPicName: 'PHOTO_' + this.state.currentPics[num].IMAGE_NAME.slice(4,-4) + '.jpg',
                currentDate: this.state.currentPics[num].DATETIME
            })
        }
    }

    componentDidMount(){
        var url = 'http://143.198.157.93:3857/gpmeta/where'
        axios.get(url)
            .then(res => this.setState({
                allPics: res.data
            }));
    }

    render() {
        return (
            <div>
                <nav class="navbar navbar-inverse navbar-fixed-top">
                    <div class="container-fluid">
                        <div class='navbar-header'>
                            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>

                            <Link class="navbar-brand" id="title" to="/">Sidewalk Project</Link>
                        </div>

                        <div class="collapse navbar-collapse" id="myNavbar">
                            <ul class="nav navbar-nav">
                                <li><Link to='/'>Home</Link></li>
                                <li><Link to="/render" class="active">Render</Link></li>
                                <li><Link to="/navigatela">NavigateLA</Link></li>
                            </ul>
                            <ul class="nav navbar-nav navbar-right">
                                <li><Link to="/about">About</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div id="Software" class="container-fluid text-center">
                    <br />
                    <br />
                    <br />

                    <h1>Sidewalk Data</h1>

                    <br />

                    <div class="row slideanim" id="demo">
                        <div class="col-sm-4">
                            <div class="card bg-light text-dark">
                                <div class="card-body">
                                    <h3>Section ID</h3>
                                    <p>{ this.state.closestSidewalk.SIDEWALK_ID }</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="card bg-light text-dark">
                                <div class="card-body">
                                    <h3>{ (this.state.currentPicName !== '') ? this.state.currentPicName : 'Image Name' }</h3>
                                    <p>Date: { (this.state.currentDate !== '') ? this.state.currentDate.slice(0,10) : '...' }</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="card bg-light text-dark">
                                <div class="card-body">
                                    <h3>SLOPE X<i class="fas fa-arrows-alt-h"></i></h3>
                                    { <p>{ Math.abs(this.state.data.SLOPE_X) }°</p> }
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-2">
                            <div class="card bg-light text-dark">
                                <div class="card-body">
                                    <h3>SLOPE Y<i class="fas fa-arrows-alt-v"></i></h3>
                                    { <p>{ Math.abs(this.state.data.SLOPE_Y) }°</p> }
                                </div>
                            </div>
                        </div>
                    </div>


                    <br />

                    {/* <!--middle--> */}
                    <div class="row slideanim">
                        <div class="col-sm-4" style={{"display":"flex","flex-flow":"column"}}>

                            <div class="row slideanim">
                                <div class="col-sm-12">
                                    <div class="card bg-light text-dark">
                                        <div class="card-body">
                                            <h3>Global Positioning System (GPS)</h3>
                                            <p>Latitude: { this.state.currentLocation.lat } {/*<span>North/South(N/S)</span>*/}</p>
                                            <p>Longitude: { this.state.currentLocation.lng } {/*<span>East/West (E/W)</span>*/}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <br />

                            <div class="row slideanim">
                                <div class="col-sm-12">
                                    <div class="card bg-light text-dark">
                                        <div class="card bg-light text-dark">
                                            <div id="map" style={{"width":"100%","height":"400px"}}>
                                                <MapContainer allRoverData={ this.props.allRoverData } currentLocation={ this.state.currentLocation } closestSidewalk={ this.state.closestSidewalk } handler={ this.handler } picHandler={ this.picHandler } />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-8">
                            <div class="card bg-light text-dark">
                                <div class="card-body">
                                    <div id="under">
                                        <a class="thumbnail" href="#thumb">
                                            {/* <img alt='GoPro' style={{width:"45%"}}  src={ this.state.currentPic } /> */}
                                            <ReactPhotoSphereViewer height="500" timeAnim={false} src={ this.state.currentPic }/>
                                            {/* <span><div id="overlay" onmousemove="zoomIn(event)"></div></span> */}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-8">
                            <div class="card bg-light text-dark">
                                <div class="card-body">
                                    <button type="button" onClick={this.prevPicHandler.bind(this)} style={{'margin': '25px 25px 25px 25px'}}><i class="fas fa-arrow-left"></i>Prev</button>
                                    <button type="button" onClick={this.nextPicHandler.bind(this)} style={{'margin': '25px 25px 25px 25px'}}>Next<i class="fas fa-arrow-right"></i></button>
                                </div>
                            </div>
                        </div>

                        <br />

                        </div> 

                    </div>

                    <br/>

                    <footer class="page-footer font-small blue pt-4">
                        <div class="container-fluid text-center text-md-left">
                            <div class="row">

                                <div class="col-md-6 mt-md-0 mt-3">

                                    <h5 class="text-uppercase"><img src="https://engpermitmanual.lacity.org/profiles/boe/themes/custom/boe_la/images/brand.png" alt="Logo" style={{"float":"left","width":"100px"}} /></h5>
                                    <br /><p>5151 State University Dr,<br />Los Angeles, CA 90032</p>

                                </div>

                        <div class="col-md-3 mb-md-0 mb-3">

                            <h5 class="text-uppercase">Contact Us</h5>

                            <ul class="list-unstyled">
                                <li>
                                    Phone: 1-(800) -999-9999
                                </li>
                                <li>
                                    Email: random@gmail.com
                                </li>
                            </ul>
                        </div>

                        <div class="col-md-3 mb-md-0 mb-3">
                            <h5 class="text-uppercase">Helpful Link</h5>

                            <ul class="list-unstyled">
                                <li>
                                    <a href="#!">Terms of Use</a>
                                </li>
                                <li>
                                    <a href="#!">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#!">FAQ</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="footer-copyright text-center py-3">
                    Copyright � 2022 All Rights Reserved by Random Company.
                </div>
            </footer>
            </div>
        );
    }
}

//PropTypes
Render.propTypes = {
    data: PropTypes.array.isRequired
}

export default Render;
