import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import AsyncCSV from './AsyncCSV';
import getQueryString from './getQueryString';
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const NavigateLA = () => {


    const dates = [];

    const [date , setDate] = useState("");
    const [data,setData] = useState([]);
    const [render, setRender] = useState(false);
    const [selected, setSelected]= useState({
                                                2021: false,
                                                2022: false
                                            });
    var month=new Array(12);
        month[0]="January";
        month[1]="February";
        month[2]="March";
        month[3]="April";
        month[4]="May";
        month[5]="June";
        month[6]="July";
        month[7]="August";
        month[8]='September';
        month[9]='October';
        month[10]='November';
        month[11]='December';
    
    //creates queryobject for endpoint call
    const queryObject = {
        limit: 50,
        attributes: ['DISTINCT(DATE)'],
        where: {
        },
        table: ["sdwk.rover_data"],
        orderBy: {
          cols: ['DATE'],
          order: "ASC",
        },
      };
    

    //toggles on and off accordion selections
    const toggle = (i) => {

        if(selected['2021']==false && i ==2021){
            setSelected({...selected,2021:true})
        }
        else if(selected['2021']==true && i ==2021){
            setSelected({...selected,2021:false})
        }
        else if(selected['2022']==false && i ==2022){
            setSelected({...selected,2022:true})
        }
        else if(selected['2022']==true && i ==2022){
            setSelected({...selected,2022:false})
        }
        

    }
    
    const getDataList = () => {
        //'http://143.198.157.93:3857/rover/where?INPUT_SW_ID=1234&LIMIT=1430'
       //'http://143.198.157.93:3857/rover/where?DATE=2022-02-24'
       console.log(getQueryString(queryObject));
       return fetch ('http://143.198.157.93:3857/test/query' + getQueryString(queryObject)).then(res => res.json());       
   }

    useEffect(()=> {

        //retrieves data from endpoint
        const getDates = async () => {
        
            const response = await getDataList();
            setData(response);      
            console.log(data);

        };

        getDates();
        
    },[]);

    //formats and returns date above button
    const test = (date) => {

        //console.log(date.substring(5,6))
        if(date.substring(5,6)==0){
            return ( <h3> {month[date.substring(6,7)-1] }  { date.substring(8,10) }  { date.substring(0,4) } </h3>)
        }
        else{
            return ( <h3> {month[date.substring(5,7)-1] }  { date.substring(8,10)}  { date.substring(0,4) } </h3>)
        }

    }

    //handles filling accordion with data
    const accordion = (item, currDate) => {
        if(item.DATE.substring(0,4)==2021 && currDate == 2021){
            return (     
                                    <div class="col-sm-4">
                                    
                                    <div class="card bg-light text-dark">
                                        <div class="card-body"> 
                                        {/* {console.log(item.DATE.substring(0,4))} */}
                                        {test(item.DATE.substring(0,10))}   
                                            <AsyncCSV date={String(item.DATE.substring(0,10))} />
                                            <br />
                                        </div>
                                    </div><br />
                                    </div>

            )
        }
        else if(item.DATE.substring(0,4)==2022 && currDate == 2022){
            return (     
                                <div class="col-sm-4">
                                    
                                    <div class="card bg-light text-dark">
                                        <div class="card-body">
                                        {/* {console.log(item.DATE.substring(0,4))} */}
                                        {test(item.DATE.substring(0,10))}   
                                            <AsyncCSV date={String(item.DATE.substring(0,10))} />
                                            <br />
                                        </div>
                                    </div><br />
                                    </div>

            )
        }




    }


    return (
        <div>
            <nav class="navbar navbar-inverse navbar-fixed-top" id="navbar">
                <div class="container-fluid">
                    <ul class="nav navbar-nav" id="white">
                        <li id="title">Sidewalk Project</li>
                        <li id="white"><Link to="/">Home</Link></li>
                        <li><Link to="/render">Render</Link></li>
                        {/* <li><Link to="/database">Database</Link></li> */}
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
     
                    

                    {/* div or button will handle accordion action for year 2021 data */}
                    {/* <div class={selected['2021'] == true ?  "title-selected": "title"} onClick={()=> toggle(2021) }> */}
                    <button type="button" class="btn btn-primary btn-lg btn-block title" onClick={()=> toggle(2021) }>
                        <h3> 2021 <span>{selected['2021'] == true ? <BiChevronDown/> : <BiChevronUp/>}</span></h3> 
                       
                    </button>
                    {/* </div> */}
                    
                    <div class={selected['2021'] == true ? "content-show row slideanim" : "content row slideanim"} id="demo">
                    {data.map((item) => (
                                    accordion(item, 2021)
                    ))}

                    </div>


                    {/* div or button will handle accordion action for year 2022 data */}
                    {/* <div class={selected['2022'] == true ?  "title-selected": "title"} onClick={()=> toggle(2022) }> */}
                    <button type="button" class="btn btn-primary btn-lg btn-block title" onClick={()=> toggle(2022) }>
                    <h3> 2022 <span>{selected['2022'] == true ? <BiChevronDown/> : <BiChevronUp/>}</span></h3>
                    </button>
                    {/* </div> */}
                    <div class={selected['2022'] == true ? "content-show row slideanim" : "content row slideanim"} id="demo">
                    {data.map((item) => (
                                    accordion(item, 2022)
                    ))}

                    </div>

                
                
            </div>
            <br />

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


export default NavigateLA;