import React from "react";
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types';

import MapContainer from "./MapContainer";

import GPFR1862 from "./images/GPFR1862.JPG"

function Render(props) {
    console.log(props.data)
    var data = props.data
    return (
        <div>
            <nav class="navbar navbar-inverse navbar-fixed-top" id="navbar">
                <div class="container-fluid">
                    <ul class="nav navbar-nav" id="white">
                        <li id="title">Sidewalk Project</li>
                        <li id="white"><Link to="/">Home</Link></li>
                        <li><Link to="/render" class="active">Render</Link></li>
                        <li><Link to="/database">Database</Link></li>
                        <li><Link to="/navigatela">NavigateLA</Link></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="about.html">About</a></li>
                    </ul>
                </div>
            </nav>



            <div id="Software" class="container-fluid text-center">
                <br />
                <br />
                <br />
                <br />

                <div>
                    { data.SIDEWALK_ID }
                </div>


                <div class="row slideanim" id="demo">
                    <div class="col-sm-4">
                        <div class="card bg-light text-dark">
                            <div class="card-body">
                                <h2>Sidewalk Project</h2>
                                <input type="text" placeholder="Search by Image Name or GPS coords..." /><i class="fas fa-search"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="card bg-light text-dark">
                            <div class="card-body">
                                <h3>Image Name<i class="fas fa-arrows-alt-h"></i></h3>
                                <p>Date: (insert from database)</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <div class="card bg-light text-dark">
                            <div class="card-body">
                                <h3>SLOPE X<i class="fas fa-arrows-alt-h"></i></h3>
                                <p>(insert from database)</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <div class="card bg-light text-dark">
                            <div class="card-body">
                                <h3>SLOPE Y<i class="fas fa-arrows-alt-v"></i></h3>
                                <p>(insert from database)</p>
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
                                        <p>Latitude: (insert from database) <span>North/South(N/S)</span></p>
                                        <p>Longitude: (insert from database) <span>East/West (E/W)</span></p>
                                        <p>Validity</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br />

                        <div class="row slideanim">
                            <div class="col-sm-12">
                                <div class="card bg-light text-dark">
                                    <div class="card bg-light text-dark">
                                        <h2>GoPro </h2>
                                        <p>Latitude: (insert from database) <span>North/South(N/S)</span></p>
                                        <p>Longitude: (insert from database) <span>East/West (E/W)</span></p>
                                        <p>Altitude</p>
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
                                            <MapContainer />
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
                                        <img alt='GoPro' style={{width:"45%"}}  src={ GPFR1862 } />
                                        {/* <span><div id="overlay" onmousemove="zoomIn(event)"></div></span> */}
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>

                    <br />

                    </div> 

                </div>


                <br />


                <footer class="page-footer font-small blue pt-4">
                    <div class="container-fluid text-center text-md-left">
                        <div class="row">

                            <div class="col-md-6 mt-md-0 mt-3">

                                <h5 class="text-uppercase"><img src="https://census.lacity.org/sites/g/files/wph1201/f/styles/generic/public/5.22.19_CITY%20SEAL%20USE.png?itok=_Nsn8aq5" alt="Logo" style={{"float":"left","width":"100px"}} /></h5>
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
                        Copyright � 2017 All Rights Reserved by Random Company.
                    </div>
                    <br />
                </footer>
        </div>
    );
}

//PropTypes
// Render.propTypes = {
//     data: PropTypes.array.isRequired
// }

export default Render;
