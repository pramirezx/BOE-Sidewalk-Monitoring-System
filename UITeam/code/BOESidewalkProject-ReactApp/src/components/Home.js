import React from "react";
import { Link } from 'react-router-dom'

// import HomePage from "./home/home";

import cityLA from "./images/web/cityLA.jpg";
import sidewalk from "./images/web/sidewalk.jpg" 
import leoRover from "./images/web/LeoRover.PNG";

function Home() {
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
                            <li><Link class="active" to='/'>Home</Link></li>
                            <li><Link to="/render">Render</Link></li>
                            <li><Link to="/navigatela">NavigateLA</Link></li>
                        </ul>
                        <ul class="nav navbar-nav navbar-right">
                            <li><Link to="/about">About</Link></li>
                        </ul>
                    </div>
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
                        The City of Los Angeles, Bureau of Engineering contains over 11,000 miles of sidewalks.
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

                            <h5 class="text-uppercase"></h5>
                            <br /><p><br /></p>

                        </div>

                        <div class="col-md-3 mb-md-0 mb-3">

                            <h5 class="text-uppercase"></h5>

                            <ul class="list-unstyled">
                                <li>
                                </li>
                                <li>
                                </li>
                            </ul>
                        </div>

                        <div class="col-md-3 mb-md-0 mb-3">
                            <h5 class="text-uppercase"></h5>

                            <ul class="list-unstyled">
                                <li>
                                </li>
                                <li>
                                </li>
                                <li>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="footer-copyright text-center py-3">
                </div>
            </footer>
        </div>

    );
}

export default Home;