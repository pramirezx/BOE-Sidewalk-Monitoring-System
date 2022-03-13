import React from "react";
import { Link } from 'react-router-dom';

// import DWGFile from "./images/web/DWGFile.png";
import sidewalkHeader from "./images/web/sidewalkheader-1.jpg";
import aboutIcon from "./images/web/about icon.jpeg";
import rover from "./images/web/rover.png"
import azure from "./images/web/azure.png"
import node from "./images/web/node.png"
import HTML_CSS from "./images/web/HTML_CSS.png"
import logo192 from "./images/web/logo192.png"
import image from "./images/web/image.png"


function About() {
    return (
        <div>
            <nav class="navbar navbar-inverse navbar-fixed-top" id="navbar">
                <div class="container-fluid">
                    <ul class="nav navbar-nav" id="white">
                        <li id="title">Sidewalk Project</li>
                        <li id="white"><Link to="/">Home</Link></li>
                        <li><Link to="/render">Render</Link></li>
                        <li><Link to="/database">Database</Link></li>
                        <li><Link to="/navigatela">NavigateLA</Link></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/about" class="active">About</Link></li>
                    </ul>
                </div>
            </nav>

            <div class="jumbotron">
                <img src={ sidewalkHeader } alt="LA Skyline" style={{width:"100%"}} />
            </div>

            <div id="about" class="container-fluid">
                <div class="row">
                    <div class="col-sm-8">
                        <h1>Why is this project being Developed?</h1><br />
                        <p>
                            The City of Los Angeles, Bureau of Engineering maintains over 11,000 miles of sidewalks.
                            When a segment of sidewalk does not settle evenly or has been raised up by tree-root growth, the sidewalk becomes uneven.
                            This can create pedestrian hazards. In addition, the City is obligated to ensure that its sidewalks conform to Federal ADA standards,
                            which limit the extent to which a sidewalk may slope.
                        </p>
                        <h2>Sidewalk Obligations And Liabilities</h2>
                        <p>
                            �Liability between municipalities and landowners for the condition of the sidewalk and for injuries sustained by those using the sidewalk
                            due to defective sidewalk conditions is the subject of lawsuits and statutory provisions. In California,
                            municipalities and counties usually own the sidewalks next to private property, but California state law long enacted states that the landowners
                            are responsible for maintaining the sidewalk fronting their property in a safe and usable manner.�
                        </p><br /><button class="btn btn-default btn-lg" onclick="https://www.stimmel-law.com/en/articles/sidewalk-obligations-and-liabilities-california#:~:text=California%20state%20law%20provides%20that,to%20perform%20his%2Fher%20duty.&text=Note%20that%20the%20municipality%20is,for%20injuries%20upon%20the%20owner.">
                            Learn More
                        </button>
                    </div>
                    <div class="col-sm-4">
                        <span><img src={ aboutIcon } alt="LA Skyline" style={{width:"100%"}} /></span>
                    </div>
                </div>
            </div>

            <hr style={{"border-top":"1px solid #a8c6fa"}} />

            <div id="about" class="container-fluid">
                <h2>2021-2022 Student Goals</h2>
                <p>
                This is the fifth term of a multi-year project. In the last term, the rover was made capable of moving autonomously, measuring crossing slopes and running slopes, collecting GPS data, and take photo images. </p>
                <p>In this term, we will focus on developing various software that: </p>
                <p> 1) lenders the photo images with slope data and GPS data </p>
                <p> 2) Processes images such as object segmenting and texture processing </p>
                <p> 3) Assists field crew while they are collecting data in the field (i.e. a user-friendly mobile app/web app). </p>
                <p> 4) In addition, develop a database schema and backend server to store and manage raw data. </p>
                
            </div>

            <hr style={{"border-top":"1px solid #a8c6fa"}} />

            <div id="Software" class="container-fluid text-center">
                <h2>Softwares & Equpiment</h2>
                <br />
                <div class="row slideanim">
                    <div class="col-sm-3">
                        <span><img src={ rover } alt="Logo" style={{width:"80px"}} /></span>
                        <h4>Rover</h4>
                    </div>
                    <div class="col-sm-3">
                        <span><img src={ azure } alt="Logo" style={{width:"100px"}} /></span>
                        <h4>Azure</h4>
                    </div>
                    <div class="col-sm-3">
                        <span><img src={ node } alt="Logo" style={{width:"80px"}} /></span>
                        <h4>Node.js</h4>
                    </div>
                   
                </div>
                <br />
                <div class="row slideanim">
                    <div class="col-sm-3">
                        <span><img src={ HTML_CSS } alt="Logo" style={{width:"100px"}} /></span>
                        <h4>HTML/CSS</h4>
                    </div>
                    <div class="col-sm-3">
                        <span><img src={ logo192 } alt="Logo" style={{width:"100px"}} /></span>
                        <h4>React</h4>
                    </div>
                    <div class="col-sm-3">
                        <span><img src={ image } alt="Logo" style={{width:"80px"}} /></span>
                        <h4>Image Segmentation</h4>
                    </div>
               
                </div>
            </div>

            <br />

            <footer class="page-footer font-small blue pt-4">
                <div class="container-fluid text-center text-md-left">
                    <div class="row">

                        <div class="col-md-6 mt-md-0 mt-3">

                            <h5 class="text-uppercase"><img src="https://census.lacity.org/sites/g/files/wph1201/f/styles/generic/public/5.22.19_CITY%20SEAL%20USE.png?itok=_Nsn8aq5" alt="Logo" style={{"float":"left","width":"100px"}} target="_blank" rel="noopener noreferrer" /></h5>
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
            </footer>
        </div>
    );
}

export default About;
