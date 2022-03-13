import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import AsyncCSV from './AsyncCSV';



const NavigateLA = () => {

    const [date , setDate] = useState("");
    const [data,setData] = useState("")
    const [noResults, setNoResults] = useState(false);
    const [gps, setGps] = useState();
    const [isFormValid, setIsFormValid] = useState(false);
    const [trigger, setTrigger] = useState(false);



    let onChange = (event) => {
        const newValue = event.target.value;
        setDate(newValue);
    }

    

    return (
        <div>
            <nav class="navbar navbar-inverse navbar-fixed-top" id="navbar">
                <div class="container-fluid">
                    <ul class="nav navbar-nav" id="white">
                        <li id="title">Sidewalk Project</li>
                        <li id="white"><Link to="/">Home</Link></li>
                        <li><Link to="/render">Render</Link></li>
                        <li><Link to="/database">Database</Link></li>
                        <li><Link to="/navigatela" class="active">NavigateLA</Link></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/about">About</Link></li>
                    </ul>
                </div>
            </nav>
            <div id="Software" class="container-fluid text-center">
                <br />
                <br />
                <br />
                <br />

                {/* <div>
                    <input placeholder={date} onChange={onChange}/>
                    <button onClick={getSidewalkData} disabled={!isFormValid}>package</button> 
                </div> */}

                <div class="row slideanim" id="demo">
                    <div class="col-sm-4">
                        <div class="card bg-light text-dark">
                            <div class="card-body">
                                <h2>NavigateLA Data</h2>
                                <input type="text" placeholder='Enter Date (e.g. 2022-02-24)' onChange={onChange} />
                                <AsyncCSV date={date} />
                            </div>
                        </div>
                    </div>     
                </div>
            </div>
            <br />
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
                    Copyright � 2022 All Rights Reserved by Random Company.
                </div>
            </footer>
        </div>

    );
}

// const styles = StyleSheet.create({

    
// });


export default NavigateLA;