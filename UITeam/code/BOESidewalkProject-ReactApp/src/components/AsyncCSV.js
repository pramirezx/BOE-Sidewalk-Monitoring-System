import React, { Component, useState,useEffect } from "react";
import { CSVLink } from "react-csv";
import getQueryString from './getQueryString';
//accepts props from navla page
const AsyncCSV = (props) => {
    const now = new Date();
    const [data,setData] = useState();
    const [loading, setLoading] = useState();
    const [isFormValid, setIsFormValid] = useState(false);
    const [date, setDate] = useState('2022-02-24');
    //headers holds the columns we want included from data to the csv
    const headers = [
            {label: 'INPUT_SW_ID', key: 'INPUT_SW_ID'},
            {label: 'LATITUDE', key: 'LATITUDE'},
            {label:'LONGITUDE', key: 'LONGITUDE'},
            {label: 'DATE', key: 'DATE'},
            {label: 'SLOPE_X', key: 'SLOPE_X'},
            {label: 'SLOPE_Y', key: 'SLOPE_Y'},
            {label: 'SRID', key: 'SRID'},
            {label: 'TIME', key: 'TIME'},
            {label: 'X_AXIS_TEMP', key: 'X_AXIS_TEMP'},
            {label: 'Y_AXIS_TEMP', key: 'Y_AXIS_TEMP'},
            {label: 'SPEED', key: 'SPEED'},
            // {label: 'PERCENT_X', key: 'PERCENT_X'},
            // {label: 'PERCENT_Y', key: 'PERCENT_Y'},
            {label: 'SEVERITY_INDEX', key: 'SEVERITY_INDEX'}

    ];
    const csvLink = React.useRef();
    const [check, setCheck] = useState(false);
    const queryObject = {
        limit: 3000,
        attributes: [],
        where: {
            "DATE": {
                eq: props.date
              },
        },
        table: ["sdwk.rover_data"],
        orderBy: {
          cols: [],
          order: "ASC",
        },
      };

    //function that handles request
     const getGpsList = () => {
         //'http://143.198.157.93:3857/rover/where?INPUT_SW_ID=1234&LIMIT=1430'
        //'http://143.198.157.93:3857/rover/where?DATE=2022-02-24'
        //console.log(getQueryString(queryObject))
        return fetch('http://143.198.157.93:3857/test/query' + getQueryString(queryObject)).then(res => res.json());       
    }
    
    //function that requests and saves the data also activating the csvlink to be downloaded
    const downloadGPS = async () => {
        setLoading(true);

        const data = await getGpsList();

        //console.log(data)
        setData(data);
        //sets the severity index based on percent_x & percent_y
        data.forEach(function(item){
            if (typeof item === "object" ){
 
               
                    if( item["PERCENT_Y"] <= 2){
                        item["SEVERITY_INDEX"] = 1
                    }
                    else if( 5 > item["PERCENT_Y"] && item["PERCENT_Y"]> 2 ){
                        item["SEVERITY_INDEX"] = 2
                    }
                    else if( 10 > item["PERCENT_Y"] && item["PERCENT_Y"]> 5 ){
                        item["SEVERITY_INDEX"] = 3
                    }
                    else if( 20 > item["PERCENT_Y"] && item["PERCENT_Y"]> 10 ){
                        item["SEVERITY_INDEX"] = 4
                    }
                    else if( item["PERCENT_Y"] >= 20){
                        item["SEVERITY_INDEX"] = 5
                    }
                

                //item["CATEGORY"] = item["ID"]
            }
          });
        setLoading(false);
        setCheck(true);
        setTimeout(() => {
            csvLink.current.link.click();
            setCheck(false);
          });
        
    }

    // useEffect(() => {
    //     //validates date to be correct
    //     if (props.date.length === 10 && parseInt(props.date.substring(0,4)) > 2000 && 
    //         parseInt(props.date.substring(0,4)) <= now.getFullYear() &&
    //         parseInt(props.date.substring(5,7)) >= 1 &&
    //         parseInt(props.date.substring(5,7)) <= 12 &&
    //         parseInt(props.date.substring(8,10)) >= 1 &&
    //         parseInt(props.date.substring(8,10)) <= 31
    //         ){
    //         setIsFormValid(true);
    //     }
    //     else {
    //         setIsFormValid(false);
    //     }

    // },[props.date]);

    return (
        <div>
            <button
                type="button" class="btn btn-secondary col-6"
                 onClick={downloadGPS}
                 disabled={isFormValid}
                 >
                {loading? "Packaging..." : "Package" }
                 </button>
            {check ?
                <CSVLink 
                headers={headers}
                data={data}
                filename={props.date +".csv"}
                ref={csvLink}
                />
            : undefined }
             
         </div>
    );

}

export default AsyncCSV;