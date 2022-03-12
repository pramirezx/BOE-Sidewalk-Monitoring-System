import React from "react";
import { Link } from 'react-router-dom'

// import HomePage from "./home/home";

import cityLA from "./images/web/cityLA.jpg";
import sidewalk from "./images/web/sidewalk.jpg" 
import leoRover from "./images/web/LeoRover.PNG";

function Home() {
    return (
        <div>
            <nav class="navbar navbar-inverse navbar-fixed-top" id="navbar">
                <div class="container-fluid">
                    <ul class="nav navbar-nav" id="white">
                        <li id="title">Sidewalk Project</li>
                        <li id="white" class="active"><Link to="/">Home</Link></li>
                        <li><Link to="/render">Render</Link></li>
                        <li><Link to="/database">Database</Link></li>
                        <li><a href="https://navigatela.lacity.org/navigatela/" target="_blank">NavigateLA</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/about">About</Link></li>
                    </ul>
                </div>
            </nav>

            <div class="jumbotron">
                <img src={ cityLA } alt="LA Skyline" style={{width:"100%"}}/>
            </div>


            <div id="about" class="container-fluid">
                <h1 style={{"text-align":"center","font-size":"80px"}}>Sidewalk Project</h1>
                <div class="row">
                    <div class="col-sm-4">
                        <span><img src={ sidewalk } alt="LA Skyline" style={{width:"100%"}}/></span>
                    </div>
                    <br/>
                    <p>
                        The City of Los Angeles, Bureau of Engineering maintains over 11,000 miles of sidewalks.
                        When a segment of sidewalk does not settle evenly or has been raised up by tree-root growth, the sidewalk becomes uneven.
                        This can create pedestrian hazards. In addition, the City is obligated to ensure that its sidewalks conform to Federal ADA standards,
                        which limit the extent to which a sidewalk may slope.
                    </p>
                    <a href="about.html" style={{"font-size":"24px","position": "absolute","right":"30px"}}>Learn More</a>
                </div>

            </div>

            <hr style={{"border-top": "1px solid #a8c6fa"}}/>

            <h2 style={{"text-align":"center","font-size":"80px"}}>Leo Rover</h2>
            <div class="container">

                <img src={ leoRover } alt="Leo Rover" style={{width:"100%;"}}/>
                <div class="text-block">
                    <h2>Leo Rover</h2>
                    <p>
                        Leo Rover is an outdoor Robotics Development Kit. It is open-source and built on RaspberryPi. With video streaming and driving UI ready out-of-the-box.
                        <span><a href="https://www.leorover.tech/" style={{"font-size":"24px","position": "absolute","right":"30px"}}>Learn More</a></span>

                    </p>
                </div>
            </div>

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
                    Copyright � 2022 All Rights Reserved by Random Company.
                </div>
            </footer>
        </div>

    );
}

export default Home;