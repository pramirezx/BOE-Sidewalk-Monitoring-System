import React from "react";
import { Link } from 'react-router-dom'

import DWGFile from "./images/web/DWGFile.png"

function Database() {
    return (
        <div>
            <nav class="navbar navbar-inverse navbar-fixed-top" id="navbar">
                <div class="container-fluid">
                    <ul class="nav navbar-nav" id="white">
                        <li id="title">Sidewalk Project</li>
                        <li id="white"><Link to="/">Home</Link></li>
                        <li><Link to="/render">Render</Link></li>
                        <li><Link to="/database" class="active">Database</Link></li>
                        <li><a href="https://navigatela.lacity.org/navigatela/" target="_blank">NavigateLA</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/about">About</Link></li>
                    </ul>
                </div>
            </nav>


            <br />
            <br />
            <br />

            <div id="about" class="container-fluid">
                <h1 style={{"text-align":"center","font-size":"80px"}}>DWG File</h1>
                <div class="row">
                    <div class="col-sm-4">
                        <span><img src={ DWGFile } alt="LA Skyline" style={{width:"100%"}} /></span>
                    </div>
                    <br/>
                    <p>
                        Currently, BOE use a mapping application that they developed alongside the Department of Public Works and
                        the Mapping and Land Records Division. This mapping application, called NavigateLA, visualizes data from reports
                        produced by the the city, county, and other associated agencies. Data is broken down into layers. Users can select
                        the layers they'd like to see or even load their own layers.
                        Ideally, sidewalk data would be added as a layer on NavigateLA so that BOE can visualize their data in one location.
                        Using AutoCAD, we can automate the creation of the AutoCAD files that can then be hosted and visualized on NavigateLA.
                        The two criteria we will focus on are cross slope and running slope and their severity indices are identified by their 
                        color. In the DWG file on the right, we've shown an example of how we can visualize part of the slope-data.
                    </p>
                    <a href="about.html" style={{"font-size":"24px","position":"absolute","right":"30px"}}>Download(to be implmented)</a>
                </div>

            </div>

            <br/>
            <br/>
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
            </footer>
        </div>

    );
}

export default Database;